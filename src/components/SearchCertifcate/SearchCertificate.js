import SubmitButton from "../elements/SubmitButton/SubmitButton";
import InputField from "../elements/InputField/InputField";
import "./SearchCertificate.scss";
import { useState } from "react";
import ViewCertificate from "../../pages/ManageCertificate/ViewCertificate";
import API from "../../services/api";
import { createNotification } from "../Notification/Notification";
import { INPUT_STATUS } from "../../constants/component.constant";

export default () => {
    const [scAddress, setScAddress] = useState({
        status: INPUT_STATUS.INIT,
        value: "",
        errorMessage: "",
    });

    const [isProcessing, setProcessing] = useState(false);
    const [certificateId, setCertificateId] = useState(null);

    const getCertificateId = async () => {
        setCertificateId(null);
        if (!scAddress.value || scAddress.value === '') {
            return;
        }

        setProcessing(true);
        const certificate = await API.getCertificateByScAddress(scAddress.value);
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
                <SubmitButton isProcessing={isProcessing} buttonText={"Search"} onClick={getCertificateId}/>
            </div>
        </div>
        {certificateId ? <ViewCertificate certificateId={certificateId}/> : <></>}
        </>
    );
}