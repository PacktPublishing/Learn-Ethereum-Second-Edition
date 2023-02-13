const fs = require('fs');
const Web3 = require('web3')
require('dotenv').config()
//setup web3
const web3 = new Web3(new Web3.providers.HttpProvider(`${process.env.L1RPC}`))

// 1. Import the contract file
const contractJsonFile = fs.readFileSync('orders.json');
const contract = JSON.parse(contractJsonFile);

const fromAddress = '0x5381E3e6b740C82b294653711cF16619D68b71B8'
// 3. Create address variables
const accountFrom = {
    privateKey: `${process.env.privateKey}`,
    address: fromAddress,
};

// 4. Get the bytecode and API
const bytecode = contract.bytecode;
const abi = contract.abi;

// 5. Create deploy function
const deploy = async () => {
  console.log(`Attempting to deploy from account ${accountFrom.address}`);

  // 6. Create contract instance
  const contractInst = new web3.eth.Contract(abi);

  // 7. Create constructor tx
  const contractTx = contractInst.deploy({
    data: bytecode
  });
  // 8. Sign transacation and send
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      data: contractTx.encodeABI(),
      gas: await contractTx.estimateGas(),
    },
    accountFrom.privateKey
  );

  // 9. Send tx and wait for receipt
  const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
  console.log(`Contract deployed at address: ${createReceipt.contractAddress}`);
};

// 10. Call deploy function
deploy();