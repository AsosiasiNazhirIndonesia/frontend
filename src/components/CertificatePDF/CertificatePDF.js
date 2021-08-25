import { Document, Image, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

export default (props) => {
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
      marginBottom: "5px"
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
      textAlign: "right"
    }
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>{props.certificateTitle}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.presentTo}>PROUDLY PRESENT TO:</Text>
          <Text style={styles.name}>{props.receiverName}</Text>
          <Text style={styles.title}>{props.certificateNo}</Text>
          <Text style={styles.description}>{props.certificateDescription}</Text>
          <Text style={styles.score}>Score: {props.certificateScore}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.date}>Date: {props.certificateDate}</Text>
          <Text style={styles.scAddress}>Smart Contract Address: {props.scAddress ? props.scAddress : '-'}</Text>
        </View>
      </Page>
    </Document>
  );
}