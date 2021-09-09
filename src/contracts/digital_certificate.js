import axios from "axios";
import web3 from "../services/web3";
import abi from "./abi.json";
import bytecodes from "./bytecodes.json";
import { sourceCode } from "./source_code";

const DigiCertContract = {};

DigiCertContract.getNewInstance = (address) => {
  return new web3.eth.Contract(abi, address);
};

DigiCertContract.deploy = (certificateHash, receiver, approvers) => {
  const digiCertContract = DigiCertContract.getNewInstance(undefined);
  return digiCertContract.deploy({
    data: bytecodes.object,
    arguments: [certificateHash, receiver, approvers],
  });
};

DigiCertContract.verify = async (address, constructorArguements) => {
  try {
    console.log('try to verifying contract');
    var data = new FormData();
    data.append('apikey', 'K9YR1H15TT4PHY9AXM7DZM38N6HCVA6PEV');
    data.append('module', 'contract');
    data.append('action', 'verifysourcecode');
    data.append('contractaddress', address);
    data.append('sourceCode', sourceCode);
    data.append('codeformat', 'solidity-single-file');
    data.append('contractname', 'DigitalCertificate');
    data.append('compilerversion', 'v0.8.7+commit.e28d00a7');
    data.append('optimizationUsed', '0');
    data.append('runs', '200');
    data.append('constructorArguments', constructorArguements);

    var config = {
      method: 'post',
      url: 'https://api-ropsten.etherscan.io/api',
      headers: { 
        ...data.getHeaders()
      },
      data : data
    };
  } catch (e) {
    console.log(e);
  }
};

export default DigiCertContract;
