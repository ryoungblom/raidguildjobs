import React, { useEffect, useState } from "react";

import Web3 from 'web3';

import { useInjectedProvider } from "../contexts/injectedProviderContext";
import { useRaidJobs } from "../contexts/raidJobsContext.tsx";

//TODO overview companies
const Companies = () => {
  const { companies } = useRaidJobs();
  const { address, requestWallet, injectedProvider} = useInjectedProvider();
  // const [loading, setLoading] = useState(true);
  // const [showHistory, setShowHistory] = useState(false);
  // const [editing, setEditing] = useState(false);
  // const [updating, setUpdating] = useState(0);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    if(injectedProvider === null){
      requestWallet();
    }
  }, )


  useEffect(() => {
    const setupAccount = async () => {
      if(address && injectedProvider){
        console.log("Provider and address found")
        const web3 = new Web3(injectedProvider)
        const balance = (await web3.eth.getBalance(address)).toString()
        setAccount(address);
        setBalance(web3.utils.fromWei(balance));
      }
    };

    setupAccount();
  }, [address, account, injectedProvider])

  return (
    <div>
      <header className="App-header">
        <h1>Registered companies</h1>

        <p> Account: {account}</p>
        <p> Balance: {balance}</p>
      </header>
    </div>
  );
};

export default Companies;
