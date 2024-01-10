import axios from "axios";

export const HOST = "http://blockchainworks.id:3001";

const API = {};

API.getUserByPublicKey = async (publicKey) => {
  try {
    const url = `${HOST}/api/users/public_key/${publicKey}`;
    const result = (await axios.get(url)).data;
    console.log('aweawe', result)
    return result.data;
  } catch (e) {
    console.log('aweawe eerr', e)
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

API.updateCertificate = async (request) => {
  try {
    const url = `${HOST}/api/certificates`;
    const result = (await axios.put(url, request)).data;
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

API.getCertificateByScAddressAndTokenId = async (scAddress, tokenId) => {
  try {
    const url = `${HOST}/api/certificates/sc_address_token_id/${scAddress}/${tokenId}`;
    const result = (await axios.get(url)).data;
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

API.getInstitutionById = async (institutionId) => {
  try {
    const url = `${HOST}/api/institutions/${institutionId}`;
    const result = (await axios.get(url)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

//certificate_type
API.addCertificateType = async (request) => {
  try {
    const url = `${HOST}/api/certificatetypes`;
    const result = (await axios.post(url, request)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.getAllCertificateTypes = async (offset, limit) => {
  try {
    const url = `${HOST}/api/certificatetypes?order_by=type&offset=${offset}&limit=${limit}`;
    const result = (await axios.get(url)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.updateCertificateType = async (request) => {
  try {
    const url = `${HOST}/api/certificatetypes`;
    const result = (await axios.put(url, request)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.deleteCertificateType = async (params) => {
  try {
    const url = `${HOST}/api/certificatetypes`;
    const result = (await axios.delete(url, { data: params })).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.getCertificateTypeById = async (certificateTypeId) => {
  try {
    const url = `${HOST}/api/certificatetypes/${certificateTypeId}`;
    const result = (await axios.get(url)).data;
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
};

API.uploadFileToIPFS = async (file, tokenId) => {
  try {
    const tempFormData = new FormData();
    tempFormData.append("file", file, file.name);
    tempFormData.append("filename", tokenId + ".png");
    const url = `http://blockchainworks.id:5000/upload`;
    const tempResult = (await axios.post(url, tempFormData)).data;

    const content =
      '{"image": "ipfs://' + tempResult + "/" + tokenId + '.png"}';
    var blob = new Blob([content], { type: "text/plain" });
    var jsonFile = new File([blob], tokenId, { type: "text/plain" });

    const formData = new FormData();
    formData.append("file", jsonFile, jsonFile.name);
    formData.append("filename", tokenId);
    const result =
      "ipfs://" + (await axios.post(url, formData)).data + "/" + tokenId;
    return result;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.addAdmin = async (request) => {
  try {
    const url = `${HOST}/api/admins`;
    const result = (await axios.post(url, request)).data;
    return result.data;
  } catch (e) {
    throw getErrorMessage(e);
  }
};

API.editAdmin = async (request) => {
  try {
    const url = `${HOST}/api/admins`;
    const result = (await axios.put(url, request)).data;
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
