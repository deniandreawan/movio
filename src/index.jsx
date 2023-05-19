import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import WebFont from "webfontloader";

import { store, persistor } from "./redux/store";
import AppRouter from "./App";
import LoadingScreen from "./components/shared/LoadingScreen";
import "normalize.css/normalize.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/style.scss";

WebFont.load({
  google: {
    families: ["Poppins: 400, 700"],
  },
});

render(
  <Provider store={store}>
    <PersistGate loading={<LoadingScreen />} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
