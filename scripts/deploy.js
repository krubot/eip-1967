require("dotenv").config();

const { writeFileSync } = require("fs");
const { ethers } = require("hardhat");
const readlinePromises = require('readline');

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

rl.question('Arguments file for deployment: ', (constructorArgsFile) => {
  if (constructorArgsFile != "") {
    var argModule = require(process.cwd() + "/" + constructorArgsFile);
  } else {
    var argModule = "";
  }

  deploy(argModule).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

  rl.close();
});

async function deploy(deployArgs) {
  const accounts = await ethers.getSigners();

  var gasPrice = await accounts[0].getGasPrice();

  console.log("Deploying contracts with the account: ", accounts[0].address);

  console.log("Account balance: ", (await accounts[0].getBalance()).toString());

  if (process.env.GOERLI_EIP_1967_CONTRACT == null) {
    const EIP1967 = await ethers.getContractFactory("EIP1967");

    const eip1967 = await EIP1967.deploy(...deployArgs,{gasLimit : "500000", gasPrice : gasPrice});

    console.log("Transaction hash of the deployment: ", eip1967.deployTransaction.hash);

    await eip1967.deployed();

    console.log("Contract has been deployed at: ", eip1967.address);

    writeFileSync('.env','GOERLI_EIP_1967_CONTRACT=\"' + eip1967.address + '\"\n',{flag:'a+'});
  } else {
    console.log("Contract has already been deployed at: ", process.env.GOERLI_EIP_1967_CONTRACT);
  }
}
