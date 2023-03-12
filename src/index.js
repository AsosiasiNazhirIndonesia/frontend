import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/scss/index.scss';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {ReactNotifications} from "react-notifications-component"

ReactDOM.render(
  <React.StrictMode>
    <ReactNotifications
      types={[
        {
          htmlClasses: ["notification__item--awesome"],
          name: "awesome",
        },
      ]}
    />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
