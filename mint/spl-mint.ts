import { Keypair, PublicKey } from "@solana/web3.js"; // ci serve per firmare la richiesta per l'airdrop
import { Connection } from "@solana/web3.js"; // ci serve per dire dove connetterci
import { mintTo, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import wallet from "../key-file.json"; // serve per la fase di test altrimenti verremo limitati



//Facciamo leggere la keypair da key-file.json adesso importato come wallet
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
console.log("keypair: ", keypair);
const publicKey = keypair.publicKey.toBase58(); // è l'indirizzo pubblico da usare
const secretKey = keypair.secretKey.toString(); // Serve a finrmare : non sonon parole ma una serie di numeri
console.log("PublicKey = ", publicKey);
console.log("SecretKey = ", secretKey);



// Utlizziamoa confirmed perchè è quello più veloce e che ci da una buona sicurezza perchè confermato da un intero cluster
const connnection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  
// attraverso la publicKey del createMint fatto con spl-init prendo il mio mint
// quanto minitamo dei token serve solo la publickey
const mint = new PublicKey("6LpSo3mnytbByVKYJV8MjMCd7w6MyRGfKcd6FRRvwkYy");


// chiamata Async anonima
(async () => {
    console.log("Start mintTo async func");
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


})();