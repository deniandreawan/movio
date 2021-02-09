import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import WebFont from "webfontloader";

import { store, persistor } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import LoadingScreen from "./components/shared/LoadingScreen";
import "normalize.css/normalize.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/style.scss";

WebFont.load({
  google: {
    families: ["Poppins: 400, 700"],
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
