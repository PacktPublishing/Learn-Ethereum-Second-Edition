package com.learnethereum.web3j.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthGetBalance;

@Service
public class BalanceService {
    @Autowired
    private Web3Service web3Service;

    public EthGetBalance getEthBalance(String address) throws Exception {
        EthGetBalance ethGetBalance = web3Service.getWeb3j().ethGetBalance(address,
                DefaultBlockParameterName.LATEST).send();
        return ethGetBalance;
    }

}
