import styles from "./CertificateMemberPDF.module.scss";

const CdertificateMemberPDF = (props) => {
  return (
    <div className={styles["template"]}>
      <div className={styles["template-body"]} id={styles["certificateImage"]}>
        <div className={styles["card-number"]}>{props?.cardNumber}</div>
        <div className={styles["card-name"]}>{props?.cardName}</div>
        <div className={styles["card-dob"]}>{props?.cardDob}</div>
        <div className={styles["card-address"]}>{props?.cardAddress}</div>
      </div>
    </div>
  );
};

export default CdertificateMemberPDF;
