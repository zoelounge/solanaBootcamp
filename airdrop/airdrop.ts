
import { Keypair } from "@solana/web3.js"; // ci serve per firmare la richiesta per l'airdrop
import { Connection } from "@solana/web3.js"; // ci serve per dire dove connetterci
import { LAMPORTS_PER_SOL } from "@solana/web3.js"; // è una cost che divide un Sol in 1MILIARDO di Lamports
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
// confirmed: se la tranzazione viene confermata almeno da un cluster, ha raggiunto l'head validator
// finalized: se la tranzazione viene eseguita al 100% da un cluster

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
      1 * LAMPORTS_PER_SOL
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

airdropMe();

// chiamata Async anonima
// (async () => {
//   console.log("Start async");

//   try {
//     console.log("Start try");

//     const airdropSignature = await connnection.requestAirdrop(
//       keypair.publicKey,
//       1 * LAMPORTS_PER_SOL
//     );

//     // vediamo cosa mostra
//     console.log("aidropSignature: ", airdropSignature);
//     // vediamo la situazione direttaemnte sull'explorer di solana
//     // ps: ci sono 3 explorer
//     // - solscan il primo explorer che poi una volta acquisito solo pubblicità;
//     // - solana Expolorer: quello ufficiale di Solana, il migliore, il più pulito e facile da leggere;
//     // - solana FM : ottimo per gli user, usa AI e "dex" molto potetni per segnalare tutto quello che succeded dentro le transazioni;
//     console.log(
//       `Succes: Chek your TX here on Solana Explorer: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`
//     );
//   } catch (error) {
//     console.log("catch: error", error);
//   }
// })();
