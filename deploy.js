const { ethers } = require('ethers');
const fs = require('fs');

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545"); // Change the URL to your Ethereum node
    const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider); // Replace YOUR_PRIVATE_KEY with your private key

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();

    console.log("MyToken deployed to:", myToken.address);

    // Write contract address to a file
    fs.writeFileSync('token_address.txt', myToken.address);
}

main();
