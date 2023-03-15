import { Store as store } from "react-notifications-component";

export function createNotification({ type, value }) {
  // return () => {
  switch (type) {
    case "info":
      store.addNotification({
        title: "Info!",
        message: value,
        type: "info",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 30000,
          onScreen: true,
        },
      });

      break;
    case "success":
      store.addNotification({
        title: "Success",
        message: value,
        type: "success",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 30000,
          onScreen: true,
        },
      });

      break;
    case "warning":
      store.addNotification({
        title: "Warning!",
        message: value,
        type: "warning",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 30000,
          onScreen: true,
        },
      });

      break;
    case "error":
      store.addNotification({
        title: "Error!",
        message: value,
        type: "danger",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 10000,
          onScreen: true,
        },
      });

      break;
  }
  // }
}
