import SubmitButton from "../elements/SubmitButton/SubmitButton";
import InputField from "../elements/InputField/InputField";
import "./SearchCertificate.scss";

export default () => {
    const value = {}
    return (
        <div className="search-certificate">
            <h1>Search Certificate</h1>
            <form className="search-form">
                <span>Cari Sertifikat</span>
                <InputField type="text" name="search-input" placeholder="Masukan Code" value={value}/>
                <SubmitButton buttonText={"Search"}/>
            </form>
        </div>
    );
}