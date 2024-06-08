import { Keypair } from "@solana/web3.js"; // ci serve per firmare la richiesta per l'airdrop
import { Connection } from "@solana/web3.js"; // ci serve per dire dove connetterci
import { LAMPORTS_PER_SOL } from "@solana/web3.js"; // è una cost che divide un Sol in 1MILIARDO di Lamports

import wallet from "./key-file.json"; // serve per la fase di test altrimenti verremo limitati
import * as bs58 from "bs58";


const connection = new Connection("https://api.devnet.solana.com");


const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));


  (async () => {
    console.log("Start async");
    let balance = await connection.getBalance(keypair.publicKey);
    console.log("balance is:");

    console.log(`${balance / LAMPORTS_PER_SOL} SOL`);
  })();