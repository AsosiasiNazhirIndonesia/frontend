import axios from "axios";

export const HOST = "http://103.172.204.60:3000";
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

API.createUser = async (request) => {
  try {
    const url = `${HOST}/api/users`;
    const result = (await axios.post(url, request)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.updateUser = async (request) => {
  try {
    const url = `${HOST}/api/users`;
    const result = (await axios.put(url, request)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.getAllUsers = async (offset, limit) => {
  try {
    const url = `${HOST}/api/users?order_by=name&order_type=asc&offset=${offset}&limit=${limit}`;
    const result = (await axios.get(url)).data;
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

API.getAllAdmins = async (offset, limit) => {
  try {
    const url = `${HOST}/api/admins?order_by=name&order_type=asc&offset=${offset}&limit=${limit}`;
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

API.signingCertificate = async (request) => {
  try {
    const url = `${HOST}/api/certificates/signing`;
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

API.getCertificatesByUser = async (userId, offset, limit) => {
  try {
    const url = `${HOST}/api/certificates/user_id/${userId}?order_by=created_date&offset=${offset}&limit=${limit}`;
    const result = (await axios.get(url)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.getCertificatesByAdmin = async (adminId, offset, limit) => {
  try {
    const url = `${HOST}/api/certificates/admin_id/${adminId}?order_by=created_date&offset=${offset}&limit=${limit}`;
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

API.getCertificateByScAddress = async (scAddress) => {
  try {
    const url = `${HOST}/api/certificates/sc_address/${scAddress}`;
    const result = (await axios.get(url)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
}

//role
API.addRole = async (request) => {
  try {
    const url = `${HOST}/api/roles`;
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

API.updateRole = async (request) => {
  try {
    const url = `${HOST}/api/roles`;
    const result = (await axios.put(url, request)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.deleteRole = async (params) => {
  try {
    const url = `${HOST}/api/roles`;
    const result = (await axios.delete(url, { data: params })).data;
    console.log(result.data);
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

//institution
API.addInstitution = async (request) => {
  try {
    const url = `${HOST}/api/institutions`;
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

API.updateInstitution = async (request) => {
  try {
    const url = `${HOST}/api/institutions`;
    const result = (await axios.put(url, request)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.deleteInstitution = async (params) => {
  try {
    const url = `${HOST}/api/institutions`;
    const result = (await axios.delete(url, { data: params })).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file, file.name);
    const url = `${HOST}/api/files`;
    const result = (await axios.post(url, formData)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
}

API.addAdmin = async (request) => {
  try {
    const url = `${HOST}/api/admins`;
    const result = (await axios.post(url, request)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
}

API.editAdmin = async (request) => {
  try {
    const url = `${HOST}/api/admins`;
    const result = (await axios.put(url, request)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
}

API.deleteRole = async (params) => {
  try {
    const url = `${HOST}/api/roles`;
    const result = (await axios.delete(url, { data: params })).data;
    console.log(result.data);
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.createUserHistory = async (request) => {
  try {
    const url = `${HOST}/api/user_history`;
    const result = (await axios.post(url, request)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.updateUserHistory = async (request) => {
  try {
    const url = `${HOST}/api/user_history`;
    const result = (await axios.put(url, request)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.getUserHistoriesByUser = async (userId) => {
  try {
    const url = `${HOST}/api/user_history/user_id/${userId}`;
    const result = (await axios.get(url)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.deleteUserHistory = async (params) => {
  try {
    const url = `${HOST}/api/user_history`;
    const result = (await axios.delete(url, { data: params })).data;
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
