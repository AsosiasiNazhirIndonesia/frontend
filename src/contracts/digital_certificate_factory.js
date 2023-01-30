
import web3 from "../services/web3";
import abiFactory from "./abi_factory.json";

const CertificateSetFactory = {};

CertificateSetFactory.getNewInstance = (address) => {
  return new web3.eth.Contract(abiFactory, address);
};

export default CertificateSetFactory;
