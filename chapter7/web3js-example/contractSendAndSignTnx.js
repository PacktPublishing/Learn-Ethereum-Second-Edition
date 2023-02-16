const fs = require('fs');
const Web3 = require('web3')
require('dotenv').config()
//setup web3
const web3 = new Web3(new Web3.providers.HttpProvider(`${process.env.L1RPC}`))

// 1. Import the contract file
const contractJsonFile = fs.readFileSync('orders.json');
const contract = JSON.parse(contractJsonFile);

const fromAddress = '0x5381E3e6b740C82b294653711cF16619D68b71B8'
// 2. Create address variables
const accountFrom = {
    privateKey: `${process.env.privateKey}`,
    address: fromAddress,
};

// 3. Create address variables
const contractAddress = '0xE442a2A8B95e3445640E67D854f6E81C907F1e35';

// 4. Get the bytecode and API
const abi = contract.abi;
// 5. Create contract instance
const contractInst = new web3.eth.Contract(abi, contractAddress);

// 5. Build order tx
const setOrderTx = contractInst.methods.setOrder(fromAddress, "Alice", "Asset1", 10);

// 6. Create setOrder function
const setOrder = async () => {
  console.log(
    `Calling the setOrder function in contract at address: ${contractAddress}`
  );

  // 7.Sign Tx with PK
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data: setOrderTx.encodeABI(),
      gas: await setOrderTx.estimateGas(),
    },
    accountFrom.privateKey
  );

  // 8. Send Tx and Wait for Receipt
  const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
  console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
};

// 9. Call store function
setOrder();