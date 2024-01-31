import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import SubmitButton from "../../components/elements/SubmitButton/SubmitButton";
import { CERTIFICATE_STATUS } from "../../constants/component.constant";
import CertificateSet from "../../contracts/digital_certificate";
import API from "../../services/api";
import web3 from "../../services/web3";
import { history } from "../../store";
import ProgressBar from "../../components/elements/ProgressBar/ProgressBar";
import CertificatePDF from "../../components/CertificatePDF/CertificatePDF";
import jsPDF from "jspdf";
import DomToImage from "dom-to-image";
import { useSelector } from "react-redux";
import { createNotification } from "../../components/Notification/Notification";
import htmlToText from "html-to-text";
import linkedinLogo from "../../assets/images/linkedin.svg";

import styles from "./ViewCertificate.module.scss";
import Status from "../../components/elements/Status/Status";

const ViewCertificate = (props) => {
  const [certificate, setCertificate] = useState({});
  const [certificateStatus, setCertificateStatus] = useState(0);
  const [progressBarContent, setProgressBarContent] = useState([]);
  const [isSigner, setSigner] = useState(false);
  const [isSigned, setSigned] = useState(true);
  const [isReceiver, setReceiver] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [allowToSigning, setAllowToSigning] = useState(false);
  const user = useSelector((state) => state.getIn(["actor", "user"]).toJS());
  const admin = useSelector((state) => state.getIn(["actor", "admin"]).toJS());
  const certificateId = props.certificateId;

  const decideSigner = () => {
    // console.log(progressBarContent[progressBarContent.length - 1], admin);
    if (
      !(
        Object.keys(certificate) <= 0 ||
        progressBarContent.length <= 0 ||
        (user?.user_id
          ? !user || Object.keys(user) <= 0
          : !admin || Object.keys(admin) <= 0)
      )
    ) {
      let temp = {};
      
      setReceiver(
        progressBarContent[progressBarContent.length - 1].user_id ===
          user.user_id
      );
      for (const content of progressBarContent) {
        if (user?.user_id) {
          if (content.user_id === user.user_id) {
            setSigner(true);
            if (temp.success && !content.success) {
              setAllowToSigning(true);
              setSigned(false);
            } else if (content.success) {
              setAllowToSigning(false);
              setSigned(true);
            } else {
              setSigned(false);
              setAllowToSigning(false);
            }
          }
        } else if (admin?.admin_id) {
          if (content.user_id === admin.admin_id) {
            setSigner(true);
            if (temp.success && !content.success) {
              setAllowToSigning(true);
              setSigned(false);
            } else if (content.success) {
              setAllowToSigning(false);
              setSigned(true);
            } else {
              setSigned(false);
              setAllowToSigning(false);
            }
          }
        }
        temp = content;
      }
    }
  };

  //TO DO
  const getCertificate = async () => {
    const newCert = await API.getCertificateById(certificateId);
    setCertificate(newCert);
    getCertificateStatus(newCert.sc_address, newCert.token_id);

    const newProgressBarContent = [
      {
        success: true,
        text: (
          <div>
            <div className={styles["progress-title"]}>Init By:</div>
            <div className={styles["progress-link"]}>{newCert.Admin.name}</div>
          </div>
        ),
      },
    ];

    const sortedApprovers = newCert.CertificateSigners.sort((a, b) => {
      return a.priority - b.priority;
    });

    const certificateSet = CertificateSet.getNewInstance(newCert.sc_address);
    let index = 0;
    const signedByReceiver = newCert.is_accepted;
    const signedByApprovers = await certificateSet.methods
      .signedByApprovers(newCert.token_id)
      .call();

    for (const approver of sortedApprovers) {

      const signedByApprover = signedByApprovers[index];
      const link = (
        <Link
          to=""
          onClick={(e) => {
            e.preventDefault();
            window.open(
              `/profile?actor_type=USER&actor_public_key=${approver.User.public_key}`,
              "_blank"
            );
          }}
        >
          {approver.User.name}
        </Link>
      );

      newProgressBarContent.push({
        success: signedByApprover,
        text: signedByApprover ? (
          <div>
            <div className={styles["progress-title"]}>Signed by :</div>
            <div className={styles["progress-link"]}>{link}</div>
          </div>
        ) : (
          <div>
            <div className={styles["progress-title"]}>Assign to:</div>
            <div className={styles["progress-link"]}>{link}</div>
          </div>
        ),
        user_id: approver.user_id,
      });
      index++;
    }

    // const signedByReceiver = await certificateSet.methods
    //   .signedByReceiver(newCert.token_id)
    //   .call();

    const link = (
      <Link
        to=""
        onClick={(e) => {
          e.preventDefault();
          window.open(
            `/profile?actor_type=USER&actor_public_key=${newCert.User.public_key}`,
            "_blank"
          );
        }}
      >
        {newCert.User.name}
      </Link>
    );
    
    newProgressBarContent.push({
      success: signedByReceiver,
      text: signedByReceiver ? (
        <div>
          <div className={styles["progress-title"]}>Received by :</div>
          <div className={styles["progress-link"]}>{link}</div>
        </div>
      ) : (
        <div>
          <div className={styles["progress-title"]}>Send to :</div>
          <div className={styles["progress-link"]}>{link}</div>
        </div>
      ),
      user_id: newCert.user_id,
    });

    setProgressBarContent(newProgressBarContent);
  };

  const getCertificateStatus = async (scAddress, tokenId) => {
    if (!web3.utils.isAddress(scAddress)) {
      return;
    }
    const certificateSet = CertificateSet.getNewInstance(scAddress);
    setCertificateStatus(await certificateSet.methods.status(tokenId).call());
  };

  useEffect(() => {
    if (Object.keys(certificate) <= 0) {
      getCertificate();
    }

    if (user || admin) {
      decideSigner();
    }
  }, [props.certificateId, certificate, certificateStatus, progressBarContent]);

  const LazyDownloadPDFButton = async () => {
    const pdf = new jsPDF("l", "px", [595, 842]);
    if (pdf) {
      const input = document.getElementById("certificateImage");
      DomToImage.toPng(input).then((imgData) => {
        pdf.addImage(imgData, "PNG", 0, 0, 842, 595);
        pdf.save("digital-certificate.pdf");
      });
    }
  };

  const UploadPNGButton = async () => {
    setProcessing(true);
    const fileBlob = await DomToImage.toBlob(
      document.getElementById("certificateImage")
    ).then(function (blob) {
      return blob;
    });
    const ipfsURI = await API.uploadFileToIPFS(fileBlob, certificate.token_id);
    const certificateSet = CertificateSet.getNewInstance(
      certificate.sc_address
    );
    const accounts = await web3.eth.getAccounts();

    const tx = certificateSet.methods.setURI(certificate.token_id, ipfsURI);

    createNotification({
      type: "Set URI...",
      value:
        "Please check your metamask and stay on this page until new URI is set",
    });

    const res = await tx.send({
      from: accounts[0],
      gas: 3000000,
      gasPrice: "30000000000",
    });
    setProcessing(false);
  };

  const getDataToSign = (certificate) => {
    const { receiver_name, no, title, description, score, date } = certificate;
    const descriptionText = htmlToText
      .fromString(description)
      .replace(/(\r\n|\n|\r| )/gm, "");
    const mergeCertificateData = (
      receiver_name +
      no +
      title +
      descriptionText +
      score +
      date
    ).replace(/(\r\n|\n|\r| )/gm, "");

    return web3.utils.keccak256(mergeCertificateData);
  };

  const getSignature = async (certificate) => {
    const certificateHash = getDataToSign(certificate);
    const accounts = await web3.eth.getAccounts();
    const signature = await web3.eth.personal.sign(
      certificateHash,
      accounts[0]
    );
    return signature;
  };

  const onSign = async () => {
    setProcessing(true);
    createNotification({
      type: "Signing...",
      value: "Please check your metamask and click SIGN",
    });
    try {


      let tokenId = certificate.token_id;

      if (!isReceiver) { // Receiver tidak perlu klik Accept

        const accounts = await web3.eth.getAccounts();
        const certificateSet = CertificateSet.getNewInstance(
          certificate.sc_address
        );
        const signature = await getSignature(certificate);
  
        let method;

        if (tokenId === '0')
        
        {

            const today = new Date();

            const thisMonth = today.getMonth();

            let approvers = [];
            for (const signer of certificate.CertificateSigners) {
              approvers.push(signer.User.public_key);
            }

            const tx = certificateSet.methods.mint(
              certificate.User.public_key,
              0,
              Math.floor(new Date(today.setMonth(thisMonth + 12)).getTime() / 1000),
              getDataToSign(certificate),
              approvers
            );

            const accounts = await web3.eth.getAccounts();

            try {
              createNotification({
                type: "Minting...",
                value:
                  "Please check your metamask and stay on this page until Certificate is Minted to blockchain",
              });

              await tx.send({
                from: accounts[0],
                gas: 3000000,
                gasPrice: "30000000000",
              }).then(async function (receipt) {
                tokenId = receipt.events.TransferSingle.returnValues.id;
                try {
                  await API.updateCertificate({
                    certificate_id: certificateId,
                    admin_id: certificate.admin_id,
                    user_id: certificate.user_id,
                    logo: certificate.logo,
                    name: certificate.name,
                    title: certificate.title,
                    no: certificate.no,
                    description: certificate.description,
                    score: certificate.score,
                    date: certificate.date,
                    sc_address: certificate.sc_address,
                    token_id: tokenId,
                    receiver_name: certificate.receiver_name,
                    is_accepted: String(certificate.is_accepted),
                    certificate_type_id: certificate.certificate_type_id,
                    status: certificate.status
                    });
          
                    createNotification({
                      type: "success",
                      value: "Update TokenId Success",
                    });
      
                  } catch (e) {
                    console.log(e);
                    createNotification({
                      type: "error",
                      value: "Can't update TokenId to Database",
                    });
                  }
                });

            } catch (e) {
              console.log(e);
              createNotification({
                type: "error",
                value: "Minting Error",
              });
            }

        }

        method = certificateSet.methods.approverSigning(
          tokenId,
          signature
        );
        await method.send({
          from: accounts[0],
          gasLimit: await method.estimateGas({ from: accounts[0] }),
          gasPrice: "100000000000",
        }).then(async function (receipt) {

          await API.signingCertificate({
            user_id: user.user_id || admin?.admin_id,
            certificate_id: certificate.certificate_id,
          });

          createNotification({
            type: "success",
            value: "Your signature submitted on blockchain and saved to database!",
          });
        });


        


      }

      else
      {

        try {
          await API.updateCertificate({
            certificate_id: certificateId,
            admin_id: certificate.admin_id,
            user_id: certificate.user_id,
            logo: certificate.logo,
            name: certificate.name,
            title: certificate.title,
            no: certificate.no,
            description: certificate.description,
            score: certificate.score,
            date: certificate.date,
            sc_address: certificate.sc_address,
            token_id: tokenId,
            receiver_name: certificate.receiver_name,
            is_accepted: String(true),
            certificate_type_id: certificate.certificate_type_id,
            status: 2
            });
  
            createNotification({
              type: "success",
              value: "Update IsAccepted Success",
            });

          } catch (e) {
            console.log(e);
            createNotification({
              type: "error",
              value: "Can't update IsAccepted to Database",
            });
          }

          createNotification({
            type: "success",
            value: "Your signature saved to database!",
          });

        // } catch (e) {
        //   createNotification({
        //     type: "error",
        //     value: typeof e === "object" ? e.message : e,
        //   });
        // }
      }

      getCertificate();


    } catch (e) {
      createNotification({
        type: "error",
        value: typeof e === "object" ? e.message : e,
      });
    }

    setProcessing(false);
  };

  const shareToLinkedIn = () => {
    const dateArr = certificate.date.split("-");
    //To Do : change ip address, add token id
    window.open(
      `https://www.linkedin.com/profile/add?startTask=Spasi%20Blockchain%20Based%20Digital%20Certificate&name=${certificate.name}&organizationId=75615928&issueYear=${dateArr[2]}&issueMonth=${dateArr[1]}&expirationYear=0&expirationMonth=0&certUrl=http%3A%2F%2F103.172.204.60%2F%3Fcontract_address%3D${certificate.sc_address}`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.documentContainer}>
        <form className={styles["form-document-status"]}>
          <div className={styles["document-name"]}>
            <span className={styles["document-name-title"]}>
              Document Name:
            </span>
            <span className={styles["document-name-value"]}>
              {certificate?.name}
            </span>
          </div>
          <div className={styles["status"]}>
            <span className={styles["status-title"]}>Status:</span>
            <Status value={CERTIFICATE_STATUS[certificateStatus]} />
          </div>
        </form>
        <ProgressBar progress={progressBarContent} />
        <div className={styles["view-action-btn"]}>
          {isReceiver ? (
            <div className={styles["share-btn"]}>
              <img
                alt=""
                src={linkedinLogo}
                onClick={() => {
                  shareToLinkedIn();
                }}
              />
            </div>
          ) : (
            <></>
          )}
          {isReceiver ? (
            <SubmitButton
              buttonText="Download"
              onClick={() => {
                LazyDownloadPDFButton();
              }}
            ></SubmitButton>
          ) : (
            <></>
          )}
          {!isReceiver && admin.name === 'creator' ? (
            <SubmitButton
              buttonText="Upload"
              onClick={async () => {
                await UploadPNGButton();
              }}
            ></SubmitButton>
          ) : (
            <div />
          )}
          <SubmitButton
            buttonText="View"
            onClick={async () => {
              window.open(
                `https://testnets.opensea.io/assets/sepolia/${certificate.sc_address}/${certificate.token_id}`,
                "__blank"
              );
            }}
          ></SubmitButton>
        </div>
      </div>
      <div className={styles["view-pdf"]}>
        <CertificatePDF
          certificateTitle={certificate.title}
          receiverName={certificate.receiver_name}
          certificateNo={certificate.no}
          certificateDescription={certificate.description}
          certificateScore={certificate.score}
          certificateDate={certificate.date}
          scAddress={certificate.sc_address}
          tokenId={certificate.token_id}
          certificateLogo={certificate.logo}
          certificateSigners={certificate.CertificateSigners}
        />
        
        {isSigner ? ( 
          <div className={styles["btn-done"]}>
            <SubmitButton
              isProcessing={isProcessing}
              disabled={!allowToSigning || certificate.is_accepted}
              buttonText={
                isSigned && !isReceiver
                  ? "Signed"
                  : isSigned && isReceiver
                  ? "Accepted"
                  : isReceiver
                  ? "Accept"
                  : "Sign"
              }
              onClick={() => {
                onSign();
              }}
            ></SubmitButton>
          </div>
        ) : (
          <></>
        )}
      </div>
      {props.actor ? (
        <div className={styles["btn-done"]}>
          <SubmitButton
            buttonText="Back"
            onClick={() => {
              history.push(`/dashboard/${props.actor}?menu=manage-certificate`);
            }}
          ></SubmitButton>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default React.memo(withRouter(ViewCertificate));
