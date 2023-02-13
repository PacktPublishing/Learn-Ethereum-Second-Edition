package com.learnethereum.web3j.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Uint;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.ECKeyPair;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.core.methods.response.EthGetTransactionCount;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.tx.response.PollingTransactionReceiptProcessor;
import org.web3j.tx.response.TransactionReceiptProcessor;


import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ContractService {
    private static Logger LOG = LoggerFactory.getLogger(ContractService.class);

    @Autowired
    private Web3Service web3Service;

    @Value("${privateKey}")
    private String privateKey;

    @Value("${chainId}")
    private int chainId;

    /**
     * deploy contract
     *
     * @return
     * @throws Exception
     */
    public String deployOrdersContract() throws Exception {
        Web3j web3j = web3Service.getWeb3j();
        TransactionManager transactionManager = new RawTransactionManager(web3j, getCredentials(), chainId);
        RemoteCall<Orders> request = Orders.deploy(web3j, transactionManager, DefaultGasProvider.GAS_PRICE,
                DefaultGasProvider.GAS_LIMIT);
        Orders orders = request.send();
        String contractAddress = orders.getContractAddress();
        return contractAddress;
    }

    /**
     * send contract transaction to invoke a method
     *
     * @param fromAddress
     * @param contractAddress
     * @param buyerAddress
     * @param buyer
     * @param product
     * @param quantity
     * @return
     * @throws Exception
     */
    public TransactionReceipt sendOrderTransaction(String fromAddress, String contractAddress, String buyerAddress, String buyer, String product, int quantity) throws Exception {
        Web3j web3j = web3Service.getWeb3j();
        List inputParams = new ArrayList();
        inputParams.add(new Address(buyerAddress));
        inputParams.add(new Utf8String(buyer));
        inputParams.add(new Utf8String(product));
        inputParams.add(new Uint(new BigInteger(String.valueOf(quantity))));
        List outputParams = Collections.emptyList();
        Function function = new Function("setOrder", inputParams, outputParams);
        String encodedFunction = FunctionEncoder.encode(function);
        TransactionManager transactionManager = new RawTransactionManager(web3j, getCredentials(), chainId);

        String transactionHash = transactionManager.sendTransaction(
                DefaultGasProvider.GAS_PRICE,
                DefaultGasProvider.GAS_LIMIT,
                contractAddress,
                encodedFunction,
                BigInteger.ZERO).getTransactionHash();
        LOG.info("transactionHash: {}", transactionHash);
        // Wait for transaction to be mined
        TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(
                web3j,
                TransactionManager.DEFAULT_POLLING_FREQUENCY,
                TransactionManager.DEFAULT_POLLING_ATTEMPTS_PER_TX_HASH);
        TransactionReceipt txReceipt = receiptProcessor.waitForTransactionReceipt(transactionHash);
        return txReceipt;
    }

    /**
     * call contract transaction without involve transaction
     *
     * @param fromAddress
     * @param contractAddress
     * @param method
     * @return
     * @throws Exception
     */
    public List<Type> callGetMethod(String fromAddress, String contractAddress, String method) throws Exception {
        Web3j web3j = web3Service.getWeb3j();
        List inputParams = new ArrayList();
        inputParams.add(new Address(fromAddress));
        List outputParams = Arrays.asList(new TypeReference<Utf8String>() {
        }, new TypeReference<Utf8String>() {
        }, new TypeReference<Uint>() {
        });
        Function function = new Function(method, inputParams, outputParams);
        String encodedFunction = FunctionEncoder.encode(function);
        Transaction transaction = Transaction.createEthCallTransaction(fromAddress, contractAddress, encodedFunction);
        EthCall response = web3j.ethCall(transaction, DefaultBlockParameterName.LATEST).send();
        String responseValue = response.getValue();
        List<Type> types = FunctionReturnDecoder.decode(responseValue, function.getOutputParameters());
        return types;
    }

    /**
     * check if contract is valid
     *
     * @param web3j
     * @param contractAddress
     * @return
     * @throws Exception
     */
    public boolean isValidContract(Web3j web3j, String contractAddress) throws Exception {
        Orders contract = Orders.load(
                contractAddress,
                web3j,
                getCredentials(),
                DefaultGasProvider.GAS_PRICE,
                DefaultGasProvider.GAS_LIMIT);
        return contract.isValid();
    }

    /**
     * get wallet private key Credentials
     *
     * @return
     */
    private Credentials getCredentials() {
        // load private key into eckey to sign
        String privatekey = privateKey;
        BigInteger privkey = new BigInteger(privatekey, 16);
        ECKeyPair ecKeyPair = ECKeyPair.create(privkey);
        Credentials credentials = Credentials.create(ecKeyPair);
        return credentials;
    }
}
