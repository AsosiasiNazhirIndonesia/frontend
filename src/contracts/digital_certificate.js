import axios from "axios";
import web3 from "../services/web3";
import abi from "./abi.json";
import bytecodes from "./bytecodes.json";
import { sourceCode } from "./source_code";

const CertificateSet = {};

// when switching to new Org
CertificateSet.getNewInstance = (address) => {
  return new web3.eth.Contract(abi, address, {
    transactionConfirmationBlocks: 3,
  });
};

// when creating to new Org, dont use deploy, use CertificateSetFactory instead
CertificateSet.deploy = (certificateHash, receiver, approvers) => {
  const CertificateSet = CertificateSet.getNewInstance(undefined);
  return CertificateSet.deploy({
    data: bytecodes.object,
    arguments: [certificateHash, receiver, approvers],
  });
};

// when creating to new Org, dont use deploy, use CertificateSetFactory instead
CertificateSet.verify = async (address, constructorArguements) => {
  try {
    console.log("try to verifying contract");
    var data = new FormData();
    data.append("apikey", "R7AIKW4GKX8NEZS8AKUF97RGXPPE4CWE6I");
    data.append("module", "contract");
    data.append("action", "verifysourcecode");
    data.append("contractaddress", address);
    data.append("sourceCode", sourceCode);
    data.append("codeformat", "solidity-single-file");
    data.append("contractname", "DigitalCertificate");
    data.append("compilerversion", "v0.8.7+commit.e28d00a7");
    data.append("optimizationUsed", "0");
    data.append("runs", "200");
    data.append("constructorArguments", constructorArguements);

    var config = {
      method: "post",
      url: "https://api-sepolia.etherscan.io/api",
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };
  } catch (e) {
    console.log(e);
  }
};

export default CertificateSet;
