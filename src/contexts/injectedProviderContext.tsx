import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
} from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
// import { OverlayContext } from './OverlayContext';

import { supportedChains } from '../utils/chain';
import {
  deriveChainId,
  deriveSelectedAddress,
  getProviderOptions,
} from '../utils/web3Modal';
// import { setPageState } from '../stores/currentPageStateStore';

const defaultModal = new Web3Modal({
  providerOptions: getProviderOptions(),
  cacheProvider: true,
  theme: 'dark',
});

export const InjectedProviderContext = createContext<{
  injectedProvider?: any;
  requestWallet?: any;
  disconnectDapp?: any;
  injectedChain?: any;
  address?: any;
  web3Modal?: any;
  state?: any;
  dispatch?: React.Dispatch<any>;
}>({});

interface InjectedProviderProps {
  children: any;
}

export const InjectedProvider: React.FC<InjectedProviderProps> = ({
  children,
}: InjectedProviderProps) => {
  const [injectedProvider, setInjectedProvider]: any = useState(null);
  const [address, setAddress] = useState(null);
  const [injectedChain, setInjectedChain] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(defaultModal);
  // const { errorToast } = useContext(OverlayContext);

  const hasListeners: any = useRef(null);

  const connectProvider = async () => {
    const providerOptions = getProviderOptions();

    if (!providerOptions) {
      setInjectedProvider(null);
      setAddress(null);
      setWeb3Modal(defaultModal);
      window.localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER');
      // errorToast({ title: 'Could not connect to unsupported network' });
      return;
    }

    const localWeb3Modal = new Web3Modal({
      providerOptions,
      cacheProvider: true,
      theme: 'dark',
    });

    const provider = await localWeb3Modal.connect();
    provider.selectedAddress = deriveSelectedAddress(provider);
    const chainId = deriveChainId(provider);

    const chain = {
      ...supportedChains[chainId],
      chainId,
    };
    console.log('connecting provider');
    const web3: any = new Web3(provider);
    if (web3?.currentProvider?.selectedAddress) {
      console.log("ADDRESS: ", web3.currentProvider.selectedAddress)
      console.log("CHAIN: ", chain)

      setInjectedProvider(web3);
      // setPageState('injectedProvider', web3);
      setAddress(web3.currentProvider.selectedAddress);
      setInjectedChain(chain);
      setWeb3Modal(localWeb3Modal);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER')) {
      console.log('CACHED');
      connectProvider();
    }
  }, []);

  // This useEffect handles the initialization of EIP-1193 listeners
  // https://eips.ethereum.org/EIPS/eip-1193

  useEffect(() => {
    const handleChainChange = () => {
      console.log('CHAIN CHANGE');
      connectProvider();
    };
    const accountsChanged = () => {
      console.log('ACCOUNT CHANGE');
      connectProvider();
    };

    const unsub = () => {
      if (injectedProvider?.currentProvider) {
        injectedProvider.currentProvider.removeListener(
          'accountsChanged',
          handleChainChange,
        );
        injectedProvider.currentProvider.removeListener(
          'chainChanged',
          accountsChanged,
        );
      }
    };

    if (injectedProvider?.currentProvider && !hasListeners.current) {
      injectedProvider.currentProvider
        .on('accountsChanged', accountsChanged)
        .on('chainChanged', handleChainChange);
      hasListeners.current = true;
    }
    return () => unsub();
  }, [injectedProvider]);

  const requestWallet = async () => {
    console.log('REQUEST WALLET');
    await connectProvider();
  };

  const disconnectDapp = async () => {
    setInjectedProvider(null);
    setAddress(null);
    setWeb3Modal(defaultModal);
    web3Modal.clearCachedProvider();
  };

  return (
    <InjectedProviderContext.Provider
      value={{
        injectedProvider,
        requestWallet,
        disconnectDapp,
        injectedChain,
        address,
        web3Modal,
      }}
    >
      {children}
    </InjectedProviderContext.Provider>
  );
};

export const useInjectedProvider = () => {
  return useContext(InjectedProviderContext);
};
