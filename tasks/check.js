require("dotenv").config();

task("check", "Runs a typedata check against the contract and returns the response", async () => {
  const EIP20 = await ethers.getContractAt([{"inputs": [],"name": "decimals","outputs": [{"internalType": "uint8","name": "","type": "uint8"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"}],ethers.constants.AddressZero);

  var eip20Proxy = await EIP20.attach(process.env.GOERLI_EIP_1967_CONTRACT);

  const eip20ProxyName = await eip20Proxy.name();

  console.log("EIP 20 name: ", eip20ProxyName);
})

module.exports = {}
