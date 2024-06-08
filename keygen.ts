import { Keypair, PublicKey } from "@solana/web3.js";
import { Connection } from "@solana/web3.js"; // ci serve per dire dove connetterci
import { LAMPORTS_PER_SOL } from "@solana/web3.js"; // è una cost che divide un Sol in 1MILIARDO di Lamports
import { createMint } from "@solana/spl-token";
import { mintTo, getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

//gnero una nuova keypair

const keypair = Keypair.generate();
const publicKey = keypair.publicKey.toBase58(); // è l'indirizzo pubblico da usare 
const secretKey = keypair.secretKey.toString(); // Serve a finrmare : non sonon parole ma una serie di numeri

console.log("PublicKey = ", publicKey);
console.log("SecretKey (o PrivateKey)= ", secretKey);




// // chiamata Async anonima
// const transferAction = async () => {
//     console.log("Start async");


//     // attraverso la publicKey del createMint fatto con spl-init prendo il mio mint
//     // quanto minitamo dei token serve solo la publickey
//     const mint = new PublicKey("6LpSo3mnytbByVKYJV8MjMCd7w6MyRGfKcd6FRRvwkYy");


//     // prendiamo il token account derivato da spl-mint.ts 
//     const fromAta = new PublicKey("98tNAR3wzN1XVRtPUnT8P4eqTxBCSakm6jA6aj1DJ9qj");

//     const keypairTo = Keypair.generate();

//     // creiamo il tokenAccount 
//     const tokenAccount = await getOrCreateAssociatedTokenAccount(
//         connnection,
//         keypair,
//         mint,
//         keypairTo.publicKey,
//     )


//     // AssociatedTokenAccount o anche ata prendiamo solo l'address
//     const toAta = tokenAccount.address;
//     console.log("AssociatedTokenAccount: toAta", toAta.toBase58());

//     // quanto dobbiamo trasferire erano stati mintati 10 me trasferiamo 5
//     const amount = 1e6;

//     await transfer(
//         connnection,
//         keypair,
//         fromAta,
//         toAta,
//         keypair.publicKey,
//         amount
//     );

//     console.log("tansfer: amount", amount, "from: ", fromAta.toBase58(), "to: ", toAta.toBase58());

// };



