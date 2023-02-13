package com.learnethereum.web3j.app;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.Web3ClientVersion;
import org.web3j.protocol.http.HttpService;

@Service
public class Web3Service {

    @Value("${L1RPC}")
    private String l1PRC;

    public Web3j getWeb3j() {
        return Web3j.build(new HttpService(l1PRC));
    }

    /**
     * get getWeb3ClientVersion
     *
     * @param web3
     * @return
     * @throws Exception
     */
    public String getWeb3ClientVersion(Web3j web3) throws Exception {
        Web3ClientVersion web3ClientVersion = web3.web3ClientVersion().sendAsync().get();
        return web3ClientVersion.getWeb3ClientVersion();
    }
}
