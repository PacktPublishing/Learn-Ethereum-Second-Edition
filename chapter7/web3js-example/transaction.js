
const Web3 = require('web3')
require('dotenv').config()
//setup web3
const web3 = new Web3(new Web3.providers.HttpProvider(`${process.env.L1RPC}`))

const fromAddress = '0x5381E3e6b740C82b294653711cF16619D68b71B8'
const toAddress = '0xA7f4b23804502E1E1a5Aeaa8FA6571A412EfdC6C'
// 2. Create account variables
const accountFrom = {
    privateKey: `${process.env.privateKey}`,
    address: fromAddress,
};
// Change addressTo
const addressTo = toAddress; 
  
// 3. Create transfer function
const transfer = async () => {
    console.log(`Sending transaction from ${accountFrom.address} to ${addressTo}`);

    // 4. Sign tx with PK
    const createTransaction = await web3.eth.accounts.signTransaction(
      {
        gas: 21000,
        to: addressTo,
        value: web3.utils.toWei('0.01', 'ether'),
      },
      accountFrom.privateKey
    );
  
    // 5. Send tx and wait for receipt
    const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
    console.log(`Transaction successful with hash: ${createReceipt.transactionHash}`);
  };
  
  // 6. Call transfer function
  transfer();