import Web3 from "web3";

let web3 = null;
if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
    window.ethereum.enable();
}

export default web3;