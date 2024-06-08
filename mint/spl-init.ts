import { Keypair } from "@solana/web3.js"; // ci serve per firmare la richiesta per l'airdrop
import { Connection } from "@solana/web3.js"; // ci serve per dire dove connetterci
import { createMint } from "@solana/spl-token";
import wallet from "../key-file.json"; // serve per la fase di test altrimenti verremo limitati




//Facciamo leggere la keypair da key-file.json adesso importato come wallet
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
console.log("keypair: ", keypair);
const publicKey = keypair.publicKey.toBase58(); // è l'indirizzo pubblico da usare
const secretKey = keypair.secretKey.toString(); // Serve a finrmare : non sonon parole ma una serie di numeri
console.log("PublicKey = ", publicKey);
console.log("SecretKey = ", secretKey);


// Creiamo una Connection
// il commitmentOrCofnig è una chiave che serve per capire a che punton siamo
// processed: se la tranzazione viene confermata almeno da un nodo
//confirmed: se la tranzazione viene confermata almeno da un cluster, ha raggiunto l'head validator
//finalized: se la tranzazione viene eseguita al 100% da un cluster

// Utlizziamoa confirmed perchè è quello più veloce e che ci da una buona sicurezza perchè confermato da un intero cluster
const connnection = new Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);

// chiamata Async anonima
(async () => {
  console.log("Start createMint async func");

  const mint = await createMint(
    connnection,
    keypair,
    keypair.publicKey,
    null,
    6,
  );
  console.log("createMint is Ok");

  console.log("Mint address:", mint.toBase58());

  console.log(
    `Succes: Chek your TX here on Solana Explorer: https://explorer.solana.com/tx/${mint.toBase58()}?cluster=devnet`
  );
})();