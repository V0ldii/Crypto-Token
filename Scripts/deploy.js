//This script is used to deploy your smart contracts to the Ethereum blockchain. It typically connects to your Ethereum node, compiles your contracts, and then deploys them using a specified wallet.

//Replace "YOUR_PRIVATE_KEY" with your Ethereum wallet's private key and "RECIPIENT_ADDRESS" with the address you want to mint tokens to. Adjust the provider URL to connect to your Ethereum node.


const anchor = require('@project-serum/anchor');
const { PublicKey } = require('@solana/web3.js');

async function main() {
    const provider = anchor.Provider.local();
    const program = anchor.workspace.MyProgram;

    // Deploy the program
    const programId = new PublicKey('YOUR_PROGRAM_ID'); // Replace with your program's ID
    await program.provider.sendAndConfirm(new anchor.web3.Transaction().add(
        anchor.web3.SystemProgram.createAccount({
            fromPubkey: program.provider.wallet.publicKey,
            newAccountPubkey: program.programId,
            space: 1024,
            lamports: await provider.connection.getMinimumBalanceForRentExemption(1024),
            programId,
        }),
    ));
    console.log(`Program deployed to: ${program.programId.toBase58()}`);
}

main();
