import React, { createContext, useContext, useState, useEffect } from "react";

import { JOB_ABI, JOB_ADDRESS, COMPANY_ABI, COMPANY_ADDRESS } from "../config";

import { useInjectedProvider } from "../contexts/injectedProviderContext";

export const RaidJobsContext = createContext<{
  companies?: any;
  jobs?: any;
  state?: any;
  dispatch?: React.Dispatch<any>;
}>({});

interface RaidJobsContextProps {
  children: React.ReactNode;
}

export const RaidJobsContextProvider: React.FC<RaidJobsContextProps> = ({
  children,
}: RaidJobsContextProps) => {
  const { requestWallet, injectedProvider } = useInjectedProvider();

  const [companies, setCompanies] = useState();
  const [jobs, setJobs] = useState();

  useEffect(() => {
    requestWallet();
  }, );

  useEffect(() => {
    if (injectedProvider !== null) {
      const web3 = injectedProvider;

      const localCompanies: any = new web3.eth.Contract(
        COMPANY_ABI,
        COMPANY_ADDRESS
      );
      const localJobs: any = new web3.eth.Contract(JOB_ABI, JOB_ADDRESS);
      setCompanies(localCompanies);
      setJobs(localJobs);
    }
  }, [injectedProvider]);

  return (
    <RaidJobsContext.Provider
      value={{
        companies,
        jobs,
      }}
    >
      {children}
    </RaidJobsContext.Provider>
  );
};

export const useRaidJobs = () => {
  const { companies, jobs } = useContext(RaidJobsContext);
  return {
    companies,
    jobs,
  };
};
