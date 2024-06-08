import { Keypair, PublicKey } from "@solana/web3.js"; // ci serve per firmare la richiesta per l'airdrop
import { Connection } from "@solana/web3.js"; // ci serve per dire dove connetterci
import { mintTo, getOrCreateAssociatedTokenAccount, transfer} from "@solana/spl-token";
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
  "finalized"
);

// attraverso la publicKey del createMint fatto con spl-init prendo il mio mint
// quanto minitamo dei token serve solo la publickey
const mint = new PublicKey("6LpSo3mnytbByVKYJV8MjMCd7w6MyRGfKcd6FRRvwkYy");


// prendiamo il token account derivato da spl-mint.ts 
const fromAta = new PublicKey("98tNAR3wzN1XVRtPUnT8P4eqTxBCSakm6jA6aj1DJ9qj");


// creiamo una nuova keypair per trasferire i token mintati
const keypairTo = Keypair.generate();
console.log("keypairTo: ", keypair);
const publicKeyTo = keypairTo.publicKey.toBase58(); // è l'indirizzo pubblico da usare
const secretKeyTo = keypairTo.secretKey.toString(); // Serve a finrmare : non sonon parole ma una serie di numeri
console.log("publicKeyTo = ", publicKeyTo);
console.log("secretKeyTo = ", secretKeyTo);

// Richiediamo 2 Sol dalla rete e mettiamolo nel notro wallet, myWallet.
console.log("Start spl-transfer");

// chiamata Async anonima
(async () => {
  console.log("Start async");

  // creiamo il tokenAccount 
const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connnection,
  keypair,
  mint,
  keypairTo.publicKey,
)


// AssociatedTokenAccount o anche ata prendiamo solo l'address
const toAta = tokenAccount.address;
console.log("AssociatedTokenAccount: toAta", toAta.toBase58());

// quanto dobbiamo trasferire erano stati mintati 10 me trasferiamo 5
const amount = 1e6;

await transfer(
    connnection,
    keypair,
    fromAta,
    toAta,
    keypair.publicKey,
    amount
  );

  console.log("tansfer: amount", amount, "from: ", fromAta.toBase58(), "to: ", toAta.toBase58());

})();
