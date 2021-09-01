import { Document, Image, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { useRef } from "react";
import ReactToPdf from "react-to-pdf";
import certiBg from "../../assets/images/CertificateTemplate.jpg";
import jsPDF from "jspdf";
import DomToImage from "dom-to-image";

export default (props) => {
  const ref = useRef();
  const styles = StyleSheet.create({
    page: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      height: '600px',
      width: '700px',
      border: "10px solid #FFD700",
      padding: 0,
      margin: 0
    },
    header: {
      height: '20%',
      backgroundColor: '#00254d',
      color: "white",
      fontSize: "28px",
      fontWeight: "400",

      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderBottom: "10px solid #FFD700"
    },
    section: {
      flexGrow: 1,
      backgroundColor: 'white',

      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
      padding: "25px"
    },
    presentTo: {
      color: "#00254d",
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "5px"
    },
    name: {
      color: "#00254d",
      fontSize: "28px",
      fontStyle: "italic",
      fontWeight: "600",
      marginBottom: "8px"
    },
    title: {
      color: "#00254d",
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    description: {
      color: "#808080",
      fontSize: "14px",
      fontWeight: "normal",
      marginBottom: "5px"
    },
    score: {
      color: "black",
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "25px"
    },
    footer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      textAlign: "center",
      padding: "25px"
    },
    date: {
      marginRight: "24px"
    },
    scAddress: {
      textAlign: "center",
      fontWeight: "bold",
    },
    image: {
      height: "1000px"
    }
  });
  const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [4,2]
  };
  const takeShot = () => {
    console.log('hay');
    const pdf = new jsPDF();
    if (pdf) {
      console.log(ref);
      const input = document.getElementById('divToOfferInfo');
      DomToImage.toPng(input)
        .then(imgData => {
          pdf.addImage(imgData, 'PNG', 10, 10);
          pdf.save('download.pdf');
        });
    }
  }
  return (
    <div>
      {/* <ReactToPdf targetRef={ref} filename="div-blue.pdf" options={options} x={.5} y={.5} scale={0.8}>
          {({toPdf}) => (
              <button onClick={toPdf}>Generate pdf</button>
          )}
      </ReactToPdf> */}
      <button onClick={() => {takeShot()}}/>
      <div style={{width: 500, height: 500}} ref={ref} id="divToOfferInfo">
        <img src={'https://api-membership.ibf.exchange/api/files/a5dad870-059d-11ec-aead-2368f7aed165.png'} style={{width: "100%"}}/>
      </div>
  </div>
  );
}