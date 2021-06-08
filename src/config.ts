import jobContract from "./contracts/JobData.json";
import companyContract from "./contracts/CompanyData.json";

//Contract Configs

// Ropsten:
//export const COUNTRY_ADDRESS = '0x7f38B87C937fDE513616a78B37d3d4B10EB6cf6C'


//Matic Mumbai:

export const JOB_ADDRESS: string = '0x00F6cC893c9e089570Dd118016eE63D40113aa43'
export const JOB_ABI: any = jobContract.abi;
export const COMPANY_ADDRESS: string = '0x7C5aCDc76F1A12F7a2c1e013f4e16e6df9B43FAb'
export const COMPANY_ABI: any = companyContract.abi;
