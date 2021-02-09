import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sagas from "../sagas";
import reducers from "../reducers";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const config = {
  key: "root",
  storage,
  whitelist: ["favorites", "loading", "search", "filters"],
};

const persistedReducer = persistReducer(config, combineReducers(reducers));

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

export const persistor = persistStore(store);

sagaMiddleware.run(sagas);
