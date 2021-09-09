import SubmitButton from "../elements/SubmitButton/SubmitButton";
import InputField from "../elements/InputField/InputField";
import "./SearchCertificate.scss";
import { useEffect, useState } from "react";
import ViewCertificate from "../../pages/ManageCertificate/ViewCertificate";
import API from "../../services/api";
import { createNotification } from "../Notification/Notification";
import { INPUT_STATUS } from "../../constants/component.constant";

export default (props) => {
    const [scAddress, setScAddress] = useState({
        status: INPUT_STATUS.INIT,
        value: "",
        errorMessage: "",
    });

    const [isProcessing, setProcessing] = useState(false);
    const [certificateId, setCertificateId] = useState(null);

    const getCertificateId = async (address) => {
        setCertificateId(null);
        if (!address || address === '') {
            return;
        }

        setProcessing(true);
        const certificate = await API.getCertificateByScAddress(address);
        if (certificate) {
            setCertificateId(certificate.certificate_id);
        } else {
            createNotification({
                type: 'error',
                value: `Certificate can't be found`
            });
        }
        setProcessing(false);
    }

    useEffect(() => {
        if (props.contractAddress) {
            setScAddress({status: INPUT_STATUS.VALID, value: props.contractAddress});
            getCertificateId(props.contractAddress);
        }
    }, [])

    return (
        <>
        <div className="search-certificate">
            <h1>Search Certificate</h1>
            <div className="search-form">
                <span>Cari Sertifikat</span>
                <InputField 
                    type="text" 
                    name="search-input" 
                    placeholder="Masukan Contract Address" 
                    value={scAddress} 
                    onChange={(e) => {
                        setScAddress({
                            status: INPUT_STATUS.VALID,
                            value: e.target.value,
                            errorMessage: "",
                        })
                    }}/>
                <SubmitButton isProcessing={isProcessing} buttonText={"Search"} onClick={() => getCertificateId(scAddress.value)}/>
            </div>
        </div>
        {certificateId ? <ViewCertificate certificateId={certificateId}/> : <></>}
        </>
    );
}