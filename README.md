# Hardhat implementation of eip-1967

This repo deploys an implementation of the eip-1967 standard for learning. It uses hardhat package to run deployments on ethereum goerli network. Please read up on the eip-1967 standard [here](https://eips.ethereum.org/EIPS/eip-1967) to get further information.

## Setup

To setup this repo firstly make sure you clone a local copy of this repo down to your workspace using git. Next download all the node modules needed here by running the following:

```
npm install
```

Now you'll need to setup the environment variable to be used in the deployment by creating a `.env` file with the following content:

```
GOERLI_RPC_URL="<goerli-rpc-url>"
PRIVATE_KEY=["<private-key-1>","<private-key-2>",...]
ETHERSCAN_API_KEY="<ertherscan-api-key>" // Optional variable although it will be needed if running a verify on this contract
```

You can use a rpc provider like `infura` and `Alchemy` for goerli and your private key can be grabbed from metamask. **Please make sure not to commit your .env file up, this can lead to loss of funds.**

To find the Etherscan API key you can follow this guide [here](https://info.etherscan.com/api-keys/).

## Compile and deploy

To compile this solidity code you'll need to run hardhat cli using `npx` like the following:

```
npx hardhat compile
```

Now you should be able to deploy your contract to goerli. To do this run the following:

```
npx hardhat run scripts/deploy.js
```

As part of the run you'll need to specify a file that contains the constructor arguments as a terminal input. See bellow an example of this, note `scripts/arguments.js` contains example constructor arguments and you might want to update this with your parameters:

```
Arguments file for deployment: scripts/arguments.js
(node:2703623) ExperimentalWarning: stream/web is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
Deploying contracts with the account:  0xA7b192eBA8E0B07e2D25c632986fA4cB2666bB9f
Account balance:  189013255808892279
Transaction hash of the deployment:  0x289c8b9887d0fd9b5e1435fafddcd10d54bf92e3dac4e9957e6985a78e13c638
Contract has been deployed at:  0xdbdDf4F7569788a45975D75dfC3d5083534C23e4
```

## Verify on etherscan

Now that this contract has been deployed it makes sense to verify the contracts code via etherscan. This means that you'll be able to view the contract and its solidity code on etherscan and also be able to interact with its functions via a web wallet. This is a key part of users being able to trust your code, after a deploy its possible for users to view the EVM opcodes and grasp an understanding of whats going on here but solidity is much clearer and commonly understood language and so translates the ideas better.

To run this verify on the deployed contract you run the following:

```
npx hardhat verify <contract-address> --constructor-args <constructor-arguments-file>
```

You can find the contract address from where it says `Contract has been deployed at:` and the constructor arguments file should be the same one you used as input to the `Arguments file for deployment:` section. You can see an example of this with the constructor defined bellow and after it will output the goerli etherscan page:

```
(node:2704729) ExperimentalWarning: stream/web is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
Nothing to compile
Successfully submitted source code for contract
contracts/eip-1967.sol:EIP1967 at 0xdbdDf4F7569788a45975D75dfC3d5083534C23e4
for verification on the block explorer. Waiting for verification result...

Successfully verified contract EIP1967 on Etherscan.
https://goerli.etherscan.io/address/0xdbdDf4F7569788a45975D75dfC3d5083534C23e4#code
```

## Verification check

To verify that this contract is a working proxy for an eip-20 token we can run a check, you can do this by running the following:

```
npx hardhat check
```

Your output should then look like the following:

```
(node:2723499) ExperimentalWarning: stream/web is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
EIP 20 name:  MyToken
```

## Cancel transactions

Sometimes you might have long running pending transactions that need to be canceled. This can be because you've set the gas price too low or maybe nodes for other reasons don't want to build that transaction into a new block. You can cancel any pending transaction by deploying a new one with the same nonce as that transaction will no data. This is all automated by running a hardhat cancel task as follows:

```
npx hardhat cancel
```

An example output of this command has been run bellow:

```
(node:2714002) ExperimentalWarning: stream/web is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
Nonce of the transactions to cancel is:  248
Submitted tx hash is:  0x6d97fc975a89262ecaabf2ec24ba60413e079a0b55dc75d39c75612758ab99ef
Transactions have now been cancelled
```
