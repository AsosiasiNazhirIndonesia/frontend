import { store } from "react-notifications-component"

export function createNotification({ type, value }) {
  // return () => {
  switch (type) {
    case "info":
      store.addNotification({
        title: "Info!",
        message: value,
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 60000,
          onScreen: true,
        },
      })

      break
    case "success":
      console.log("trigger")
      store.addNotification({
        title: "Success",
        message: value,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 60000,
          onScreen: true,
        },
      })

      break
    case "warning":
      console.log("trigger")
      store.addNotification({
        title: "Warning!",
        message: value,
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 60000,
          onScreen: true,
        },
      })

      break
    case "error":
      console.log("trigger")
      store.addNotification({
        title: "Error!",
        message: value,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 10000,
          onScreen: true,
        },
      })

      break
  }
  // }
}
