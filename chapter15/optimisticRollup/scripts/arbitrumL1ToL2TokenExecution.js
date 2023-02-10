const { ethers } = require('hardhat');
const { BigNumber, providers, Wallet }  = require( 'ethers');
const {getL2Network, Erc20Bridger, L1ToL2MessageStatus }  = require( '@arbitrum/sdk');
const { arbLog, requireEnvVariables } = require( 'arb-shared-dependencies');

require('dotenv').config()
requireEnvVariables(['DEVNET_PRIVKEY', 'L1RPC', 'L2RPC'])

/**
 * Set up L1 and L2 wallets connected with wallet providers
 */
let walletPrivateKey = process.env.DEVNET_PRIVKEY

const l1Provider = new providers.JsonRpcProvider(process.env.L1RPC)
const l2Provider = new providers.JsonRpcProvider(process.env.L2RPC)

const l1Wallet = new Wallet(walletPrivateKey, l1Provider)
const l2Wallet = new Wallet(walletPrivateKey, l2Provider)

/**
 * Set the L1 amount of token to be transferred to L2
 */
const tokenAmount = BigNumber.from(200)

const main = async () => {
    console.log(" -------- initializing ----------");
    await arbLog('Deposit L1 ERC20 token to L2 using Arbitrum SDK')
    console.log(" ---- getL2Network -----");
    const l2Network = await getL2Network(l2Provider)
    console.log(" ---- load erc20Bridge in L2 -----")
    const erc20Bridge = new Erc20Bridger(l2Network)
    console.log('Deploying the MyERC20 Token to L1:')
    const L1MyERC20Token = await (await ethers.getContractFactory('MyERC20Token')).connect(l1Wallet)
    const l1MyERC20Token = await L1MyERC20Token.deploy()
    await l1MyERC20Token.deployed()
    console.log(`MyERC20Token is deployed to L1 at ${l1MyERC20Token.address}`)
    const erc20Address = l1MyERC20Token.address
    console.log('get L1 Arbitrum Gateway contract address to get  initial MyERC20Token token balance of Bridge')
    const l1GatewayAddress = await erc20Bridge.getL1GatewayAddress(erc20Address,l1Provider)
    console.log('l1GatewayAddress:', l1GatewayAddress)
    console.log('Approve ERC20 token in L1 for token transfer to L2, l1 Wallet provider will sign the approveToken transaction before L1 Gateway making the token transfer call')
    const approveTx = await erc20Bridge.approveToken({l1Signer: l1Wallet,erc20L1Address: erc20Address})
    const approveRec = await approveTx.wait()
    console.log( `Transaction success, MyERC20Token is allowed the Arbitrum Bridge to spend, txnHash: ${approveRec.transactionHash}`)
    console.log('Deposit MyERC20Token to L2 using Arbitrum Erc20Bridger, amount: ', tokenAmount)
    const depositTx = await erc20Bridge.deposit({
      amount: tokenAmount,
      erc20L1Address: erc20Address,
      l1Signer: l1Wallet,
      l2Provider: l2Provider,
    })
    console.log('wait for transactions in both L1 and L2 to be confirmed')
    const depositRec = await depositTx.wait()
    const l2Result = await depositRec.waitForL2(l2Provider)
    console.log('check L1 and L2 transactions is completed')
    if(l2Result.complete) {
      console.log( `L2 message successful: status: ${L1ToL2MessageStatus[l2Result.status]}`)
    } else {
      console.log(`L2 message failed: status ${L1ToL2MessageStatus[l2Result.status]}`)
    }
    console.log('Get the L1 Bridge token balance')
    const finalL1BridgeTokenBalance = await l1MyERC20Token.balanceOf(l1GatewayAddress)
    console.log('Initial L1 Bridge token balance is ',initialBridgeTokenBalance)
    console.log('Transfered token amount is ',tokenAmount)
    console.log('Current L1 Bridge token balance is ', finalL1BridgeTokenBalance)
    
    console.log('Get the L2 Token ERC20 token balance')
    const l2TokenAddress = await erc20Bridge.getL2ERC20Address(
      erc20Address,
      l1Provider
    )
    const l2Token = erc20Bridge.getL2TokenContract(l2Provider, l2TokenAddress)
    console.log('Get the L2 token')
    const l21TokenBalance =  (await l2Token.functions.balanceOf(l2Wallet.address))[0];
    console.log('L2 token amount: ', l21TokenBalance)

    console.log(" -------- Done ---------");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
