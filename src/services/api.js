import axios from "axios";

const HOST = 'http://103.31.39.134:3000';
const API = {};

API.getUserByPublicKey = async (publicKey) => {
    try {
        const url = `${HOST}/api/users/public_key/${publicKey}`;
        const result = (await axios.get(url)).data;
        return result.data;
    } catch (e) {
        throw getErrorMessage(e);
    }
}

API.getUserByUserId = async (userId) => {
    try {
        const url = `${HOST}/api/users/${userId}`;
        const result = (await axios.get(url)).data;
        return result.data;
    } catch (e) {
        throw getErrorMessage(e);
    }
}

API.userLogin = async (request) => {
    try {
        const url = `${HOST}/api/users/login`;
        const result = (await axios.post(url, request)).data;
        return result.data;
    } catch (e) {
        throw getErrorMessage(e);
    }
}

API.getAdminByPublicKey = async (publicKey) => {
    try {
        const url = `${HOST}/api/admins/public_key/${publicKey}`;
        const result = (await axios.get(url)).data;
        return result.data;
    } catch (e) {
        throw getErrorMessage(e);
    }
}

API.adminLogin = async (request) => {
    try {
        const url = `${HOST}/api/admins/login`;
        const result = (await axios.post(url, request)).data;
        return result.data;
    } catch (e) {
        throw getErrorMessage(e);
    }
}

API.addCertificate = async (request) => {
    try {
        const url = `${HOST}/api/certificates`;
        const result = (await axios.post(url, request)).data;
        return result.data;
    } catch (e) {
        throw getErrorMessage(e);
    }
}

API.getAllCertificates = async (offset, limit) => {
    try {
        const url = `${HOST}/api/certificates?order_by=created_date&offset=${offset}&limit=${limit}`;
        const result = (await axios.get(url)).data;
        return result.data;
    } catch (e) {
        throw getErrorMessage(e);
    }
}

API.getCertificateById = async (certificateId) => {
    try {
        const url = `${HOST}/api/certificates/${certificateId}`;
        const result = (await axios.get(url)).data;
        return result.data;
    } catch (e) {
        throw getErrorMessage(e);
    }
}

const getErrorMessage = (e) => {
    return e ? e.response ? e.response.data ? e.response.data.message ? e.response.data.message : e : e : e : e;
}

export default API;