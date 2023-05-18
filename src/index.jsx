import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import WebFont from "webfontloader";

import { store, persistor } from "./redux/store";
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

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

