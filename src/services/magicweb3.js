import Web3 from "web3";
import { magic } from '../magic/lib/magic';

let magicweb3 = null;

if (magic) {
    magicweb3 = new Web3(magic.rpcProvider);
}

export default magicweb3;