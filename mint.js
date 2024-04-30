//This script is used to mint tokens after the contract has been deployed. It connects to the Ethereum node, loads the deployed contract using its address, and then calls the minting function to create new tokens.

const { ethers } = require('ethers');
const fs = require('fs');

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545"); // Change the URL to your Ethereum node
    const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider); // Replace YOUR_PRIVATE_KEY with your private key

    // Read contract address from file
    const contractAddress = fs.readFileSync('token_address.txt', 'utf-8');

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = new ethers.Contract(contractAddress, MyToken.interface, wallet);

    const recipient = "RECIPIENT_ADDRESS"; // Replace with recipient's address
    const amount = ethers.utils.parseEther("100"); // Mint 100 tokens

    await myToken.mint(recipient, amount);
    console.log(`Minted ${amount.toString()} tokens to ${recipient}`);
}

main();
