//This script is used to mint tokens after the contract has been deployed. It connects to the Ethereum node, loads the deployed contract using its address, and then calls the minting function to create new tokens.

const anchor = require('@project-serum/anchor');
const { PublicKey } = require('@solana/web3.js');

async function main() {
    const provider = anchor.Provider.local();
    const program = anchor.workspace.MyProgram;

    // Mint tokens
    const myToken = anchor.web3.Keypair.generate();
    const recipient = new PublicKey('RECIPIENT_ADDRESS'); // Replace with recipient's address

    await program.rpc.mint({
        accounts: {
            authority: program.provider.wallet.publicKey,
            myToken,
            recipient,
            systemProgram: anchor.web3.SystemProgram.programId,
        },
    });
    console.log(`Minted tokens to: ${recipient.toBase58()}`);
}

main();
