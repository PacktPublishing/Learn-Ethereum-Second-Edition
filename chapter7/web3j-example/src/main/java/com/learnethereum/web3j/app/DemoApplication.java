package com.learnethereum.web3j.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.web3j.abi.datatypes.Type;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.utils.Convert;

import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;


@SpringBootApplication
public class DemoApplication implements CommandLineRunner {
    private static Logger LOG = LoggerFactory.getLogger(DemoApplication.class);

    @Autowired
    private BalanceService balanceService;

    @Autowired
    private Web3Service web3Service;

    @Autowired
    private ContractService contractService;

    @Value("${fromAddress}")
    private String fromAddress;

    @Value("${contractAddress}")
    private String contractAddress;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        runWeb3jClientVersion();
        //runBalance();
        //runDeployContract();
        //isValidContract();
        //sendOrderTransaction();
        //runCallContract();
    }

    public void runDeployContract() throws Exception {
        LOG.info("Starting deploy Orders contract");
        String orderContractAddress = contractService.deployOrdersContract();
        LOG.info("Orders contract deployed to : {}", orderContractAddress);
    }

    public void isValidContract() throws Exception {
        Web3j web3j = web3Service.getWeb3j();
        boolean isValidContract = contractService.isValidContract(web3j, contractAddress);
        LOG.info("isValidContract: {}", isValidContract);
    }

    public void sendOrderTransaction() throws Exception {
        LOG.info("Starting send Orders");
        String buyer = "Bob";
        String product = "NFTAsset1";
        int quantity = 20;
        TransactionReceipt transactionReceipt = contractService.sendOrderTransaction(fromAddress, contractAddress, fromAddress, buyer, product, quantity);
        LOG.info("sent contract Orders : {}", transactionReceipt);
    }

    public void runCallContract() throws Exception {
        LOG.info("Starting call getOrders function");
        List<Type> orders = contractService.callGetMethod(fromAddress, contractAddress, "getOrder");
        String result = orders.stream().map(o -> String.valueOf(o.getValue())).collect(Collectors.joining(","));
        LOG.info("getOrders result : {}", result);
    }


    public void runWeb3jClientVersion() throws Exception {
        Web3j web3j = web3Service.getWeb3j();
        String web3ClientVersion = web3Service.getWeb3ClientVersion(web3j);
        LOG.info("web3ClientVersion: {}", web3ClientVersion);
    }

    public void runBalance() throws Exception {
        LOG.info("Get Balance");
        String address = fromAddress;
        EthGetBalance ethGetBalance = balanceService.getEthBalance(address);
        BigInteger balance = ethGetBalance.getBalance();
        LOG.info("Balance for address: {} is: {} wei <-> {} (Ether)", address, balance, Convert.fromWei(String.valueOf(balance), Convert.Unit.ETHER));
    }
}

