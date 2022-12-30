function calldata(implementationAddr,implementationABI,implementationInitialize,implementationArgs) {
  const signer = new ethers.Wallet(JSON.parse(process.env.PRIVATE_KEYS)[0]);

  const implementation = new ethers.Contract(implementationAddr,implementationABI,signer);

  const calldata = implementation.interface.encodeFunctionData(implementationInitialize,implementationArgs);

  return [implementationAddr,calldata]
}

module.exports = calldata(
  "0x10C7Ff8bBE36fC1fA4dAF7Ea5292e297Fa1Bb2FA",  // Implementation contract address
  [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name_",
          "type": "string"
        },{
          "internalType": "string",
          "name": "symbol_",
          "type": "string"
        },{
          "components": [
            {
              "internalType": "address",
              "name": "airdropAddress",
              "type": "address"
            },{
              "internalType": "uint256",
              "name": "airdropAmount",
              "type": "uint256"
            }
          ],
          "internalType": "struct EIP20.airdrop[]",
          "name": "airdrop_",
          "type": "tuple[]"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ], // Implementation contract initialization ABI
  "initialize(string,string,(address,uint256)[])", // Implementation contract initialization encoded function
  [
  	"MyToken",
  	"HIX",
  	[
  		{
  			"airdropAddress": "0xA7b192eBA8E0B07e2D25c632986fA4cB2666bB9f",
  			"airdropAmount": "1000000000000000000"
  		}
  	]
  ] // Implementation contract initialization arguments
);
