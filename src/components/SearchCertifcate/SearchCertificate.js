import SubmitButton from "../elements/SubmitButton/SubmitButton";
import InputField from "../elements/InputField/InputField";
import { useEffect, useState } from "react";
import ViewCertificate from "../../pages/ManageCertificate/ViewCertificate";
import searchIcon from "../../assets/icons/search.svg";
import API from "../../services/api";
import { createNotification } from "../Notification/Notification";
import { INPUT_STATUS } from "../../constants/component.constant";

import styles from "./SearchCertificate.module.scss";

const SearchCertifcate = (props) => {
  const [scAddress, setScAddress] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });

  const [tokenId, setTokenId] = useState({
    status: INPUT_STATUS.INIT,
    value: "",
    errorMessage: "",
  });

  const [isProcessing, setProcessing] = useState(false);
  const [certificateId, setCertificateId] = useState(null);

  const getCertificateId = async (address, tokenId) => {
    setCertificateId(null);
    if (!address || address === "") {
      return;
    }

    setProcessing(true);
    const certificate = await API.getCertificateByScAddressAndTokenId(
      address,
      tokenId
    );

    if (certificate) {
      setCertificateId(certificate.certificate_id);
    } else {
      createNotification({
        type: "error",
        value: `Certificate can't be found`,
      });
    }
    setProcessing(false);
  };

  useEffect(() => {
    if (props.contractAddress) {
      setScAddress({
        status: INPUT_STATUS.VALID,
        value: props.contractAddress,
      });
      getCertificateId(props.contractAddress);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.searchCertificate}>
        <h4>Certificate Search</h4>
        <InputField
          type="text"
          name="search-input"
          placeholder="Masukkan Contract Address"
          value={scAddress}
          onChange={(e) => {
            setScAddress({
              status: !e?.target?.value
                ? INPUT_STATUS.INIT
                : INPUT_STATUS.VALID,
              value: e.target.value,
              errorMessage: "",
            });
          }}
        />
        <div className="mt-2" />
        <InputField
          type="text"
          name="search-input"
          placeholder="Masukan NFT Id"
          value={tokenId}
          onChange={(e) => {
            setTokenId({
              status: !e?.target?.value
                ? INPUT_STATUS.INIT
                : INPUT_STATUS.VALID,
              value: e.target.value,
              errorMessage: "",
            });
          }}
        />
        <div className="mt-6" />
        <SubmitButton
          isProcessing={isProcessing}
          buttonText={"Search"}
          onClick={() => getCertificateId(scAddress?.value, tokenId?.value)}
        />
      </div>
      <div className="separator mt-6 mb-8" />
      {certificateId ? (
        <div className={styles.searchKeyword}>
          <img
            src={searchIcon}
            className={styles.searchIcon}
            alt="searchicon"
          />
          <span className={styles.searchKeywordTitle}>You search for: </span>
          <span className={styles.searchKeywordValue}>{scAddress?.value}</span>
        </div>
      ) : (
        <div />
      )}

      {certificateId ? (
        <ViewCertificate certificateId={certificateId} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchCertifcate;
