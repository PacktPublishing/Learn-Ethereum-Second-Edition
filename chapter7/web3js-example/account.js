
async function getWeb3() {
    const Web3 = require('web3')
    //Instantiating a Web3 instance and using localhost Ethereum node
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    return web3
}

async function getAccounts(web3) {
    return await web3.eth.getAccounts()
}
async function createAccount(web3, password) {
    return await web3.eth.personal.newAccount(password);
}
async function getAccountBalances(web3, accounts) {
    // get balance
    await accounts.forEach(async account => {
        const balance = await web3.eth.getBalance(account)
        console.log(`account: ${account}, balance: ${balance}`)
    });
}
async function main() {
    let web3= await getWeb3()
    let accounts = await getAccounts(web3)
    console.dir(accounts)
    let password = '!@superpassword';
    let account = await createAccount(web3, password)
    console.log(`account created: ${account}`)
    await getAccountBalances(web3, accounts)
    accounts = await getAccounts(web3)
    console.log("Total accounts are: ")
    console.dir(accounts)
}
main()