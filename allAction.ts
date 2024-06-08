import { Keypair, PublicKey } from "@solana/web3.js";
import { Connection } from "@solana/web3.js"; // ci serve per dire dove connetterci
import { LAMPORTS_PER_SOL } from "@solana/web3.js"; // è una cost che divide un Sol in 1MILIARDO di Lamports
import { createMint } from "@solana/spl-token";
import { mintTo, getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import wallet from "./key-file.json"; // serve per la fase di test altrimenti verremo limitati


const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));


// Creiamo una Connection
// Utlizziamoa confirmed perchè è quello più veloce e che ci da una buona sicurezza perchè confermato da un intero cluster
const connnection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
);


// Richiediamo 2 Sol dalla rete e mettiamolo nel notro wallet, myWallet.
console.log("Start aidropSignature");

const airdropMe = async () => {
    console.log("Start async");

    try {
        console.log("Start try");

        const airdropSignature = await connnection.requestAirdrop(
            keypair.publicKey,
            2 * LAMPORTS_PER_SOL
        );

        // vediamo cosa mostra
        console.log("aidropSignature: ", airdropSignature);
        // vediamo la situazione direttaemnte sull'explorer di solana
        // ps: ci sono 3 explorer
        // - solscan il primo explorer che poi una volta acquisito solo pubblicità;
        // - solana Expolorer: quello ufficiale di Solana, il migliore, il più pulito e facile da leggere;
        // - solana FM : ottimo per gli user, usa AI e "dex" molto potetni per segnalare tutto quello che succeded dentro le transazioni;
        console.log(
            `Succes: Chek your TX here on Solana Explorer: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`
        );
    } catch (error) {
        console.log("error", error);
    }
};

console.log("airdropMe");
airdropMe();



// chiamata initMint Async
const initMint = async () => {
    console.log("Start createMint async func");

    const mintInit = await createMint(
        connnection,
        keypair,
        keypair.publicKey,
        null,
        6,
    );
    console.log("createMint is Ok");
    console.log("Mint address:", mintInit.toBase58());
    console.log(
        `Succes: Chek your TX here on Solana Explorer: https://explorer.solana.com/tx/${mintInit.toBase58()}?cluster=devnet`
    );
    return mintInit;
};


// chiamata Async anonima
const mintAndTransferAction = async () => {
    console.log("StartmintAndTransferAction async func");

    // attraverso la publicKey del initMint fatto con spl-init prendo il mio mint

    initMint().then(async (mintInit) => {
        console.log('mintInit = ', mintInit)
        // attraverso la publicKey del createMint fatto con spl-init prendo il mio mint
        // quanto minitamo dei token serve solo la publickey
        const mint = new PublicKey(mintInit.toBase58());

        // servono due func 
        //1 mintTo: 
        //2 getOrCreateAssociatedTokenAccount: perchè devo creare il tokenAccount appartenten a noi per mintare al suo interno i token

        // partiamo dalla creazione del nostro tokenAccount
        // che ci darà un account appunto ed è una normale transazione 
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connnection,
            keypair,
            mint,
            keypair.publicKey,
        )


        // AssociatedTokenAccount o anche ata prendiamo solo l'address
        const ata = tokenAccount.address;
        console.log("AssociatedTokenAccount: ata", ata.toBase58());

        const amount = 10e6;

        await mintTo(
            connnection,
            keypair,
            mint,
            ata,
            keypair.publicKey,
            amount
        );


        console.log("minted: ", amount, "to: ", ata.toBase58());

        // prendiamo il token account derivato da spl-mint.ts 
        const fromAta = new PublicKey(ata.toBase58());

        // creiamo una nuova keypair per trasferire i token mintati
        const keypairTo = Keypair.generate();
        const publicKeyTo = keypairTo.publicKey.toBase58(); // è l'indirizzo pubblico da usare
        const secretKeyTo = keypairTo.secretKey.toString(); // Serve a finrmare : non sonon parole ma una serie di numeri
        console.log("publicKeyTo = ", publicKeyTo);
        console.log("secretKeyTo = ", secretKeyTo);

        // creiamo il tokenAccount 
        const transferTokenAccount = await getOrCreateAssociatedTokenAccount(
            connnection,
            keypair,
            mint,
            keypairTo.publicKey,
        )


        // AssociatedTokenAccount o anche ata prendiamo solo l'address
        const toAta = transferTokenAccount.address;
        console.log("AssociatedTokenAccount: toAta", toAta.toBase58());

        // quanto dobbiamo trasferire erano stati mintati 10 me trasferiamo 5
        const toAmount = 1e6;

        await transfer(
            connnection,
            keypair,
            fromAta,
            toAta,
            keypair.publicKey,
            toAmount
        );

        console.log("tansfer: amount", toAmount, "from: ", fromAta.toBase58(), "to: ", toAta.toBase58());

    })


};

console.log("Chimao mintAndTransferAction");
mintAndTransferAction();

