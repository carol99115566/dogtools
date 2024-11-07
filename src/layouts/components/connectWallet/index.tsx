import { Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useGlobalContext } from '@/layouts/chainContext';
import React, { useEffect, useState } from 'react';
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { Web3ReactProvider, useWeb3React, initializeConnector } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

// 初始化连接器
// 初始化 InjectedConnector
// const [injected, hooksInjected] = initializeConnector(
  // (actions) =>
    // new InjectedConnector({
    //   actions, // 传入 actions 参数
    //   supportedChainIds: [1, 56, 137],
    // })
// );

// const [walletConnect, hooksWalletConnect] = initializeConnector(() => 
  // new WalletConnectConnector({
  //   rpc: { 1: "https://mainnet.infura.io/v3/YOUR_INFURA_ID" },
  //   bridge: "https://bridge.walletconnect.org",
  //   qrcode: true
  // })
// );

// const connectors = [
//   [injected, hooksInjected],
//   [walletConnect, hooksWalletConnect]
// ];

const ConnectWallet: React.FC = () => {
  const { connector, isActive, account } = useWeb3React();
  const [web3Modal, setWeb3Modal] = useState<any>(null);
  const { platform } = useGlobalContext();

  useEffect(() => {
    const web3Modal = new Web3Modal({
      cacheProvider: true, 
      providerOptions: {
        injected: {
          package: null, 
        },
        walletconnect: {
          package: WalletConnectConnector, 
        }
      }
    });
    setWeb3Modal(web3Modal);
  }, []);

  const connectWallet = async () => {
    const provider = await web3Modal.connect();
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = ethersProvider.getSigner();
    const address = await (await signer).getAddress(); // 解析 Promise 并获取地址
    console.log("Connected wallet address:", address);
  };

  const disconnectWallet = async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      if (connector?.deactivate) {
        await connector.deactivate();
      } else {
        await connector.resetState();
      }
    }
  };
  
  return (
    <Web3ReactProvider>
      <Button type="primary" shape="round" icon={<GlobalOutlined />} size='large' onClick={connectWallet}>
        ConnectWallet
      </Button>
    </Web3ReactProvider>
    
  );
};

export default ConnectWallet;
