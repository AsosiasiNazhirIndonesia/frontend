import axios from "axios";

const HOST = "http://103.31.39.134:3000";
const API = {};

API.getUserByPublicKey = async (publicKey) => {
  try {
    const url = `${HOST}/api/users/public_key/${publicKey}`;
    const result = (await axios.get(url)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.getUserByUserId = async (userId) => {
  try {
    const url = `${HOST}/api/users/${userId}`;
    const result = (await axios.get(url)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.userLogin = async (request) => {
  try {
    const url = `${HOST}/api/users/login`;
    const result = (await axios.post(url, request)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.getAdminByPublicKey = async (publicKey) => {
  try {
    const url = `${HOST}/api/admins/public_key/${publicKey}`;
    const result = (await axios.get(url)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.adminLogin = async (request) => {
  try {
    const url = `${HOST}/api/admins/login`;
    const result = (await axios.post(url, request)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

// certificate
API.addCertificate = async (request) => {
  try {
    const url = `${HOST}/api/certificates`;
    const result = (await axios.post(url, request)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.getAllCertificates = async (offset, limit) => {
  try {
    const url = `${HOST}/api/certificates?order_by=created_date&offset=${offset}&limit=${limit}`;
    const result = (await axios.get(url)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.getCertificateById = async (certificateId) => {
  try {
    const url = `${HOST}/api/certificates/${certificateId}`;
    const result = (await axios.get(url)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

//role
API.addRole = async (request) => {
  try {
    const url = `${HOST}/api/role`;
    const result = (await axios.post(url, request)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.getAllRoles = async (offset, limit) => {
  try {
    const url = `${HOST}/api/roles?order_by=name&offset=${offset}&limit=${limit}`;
    const result = (await axios.get(url)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.getRoleById = async (roleId) => {
  try {
    const url = `${HOST}/api/roles/${roleId}`;
    const result = (await axios.get(url)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

//institution
API.addInstitution = async (request) => {
  try {
    const url = `${HOST}/api/institution`;
    const result = (await axios.post(url, request)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.getAllInstitutions = async (offset, limit) => {
  try {
    const url = `${HOST}/api/institutions?order_by=name&offset=${offset}&limit=${limit}`;
    const result = (await axios.get(url)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.getInstitutionById = async (institutionId) => {
  try {
    const url = `${HOST}/api/institutions/${institutionId}`;
    const result = (await axios.get(url)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

const getErrorMessage = (e) => {
  return e
    ? e.response
      ? e.response.data
        ? e.response.data.message
          ? e.response.data.message
          : e
        : e
      : e
    : e;
};

export default API;
