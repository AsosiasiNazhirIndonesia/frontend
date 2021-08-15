import axios from "axios";

const HOST = 'http://localhost:3000';
const API = {};
API.getUserByPublicKey = async (publicKey) => {
    const url = `${HOST}/api/users/public_key/${publicKey}`;
    const result = (await axios.get(url)).data;
    return result.data;
}

export default API;