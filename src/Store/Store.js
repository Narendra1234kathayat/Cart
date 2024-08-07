import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./Slices/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, PERSIST } from "redux-persist";

const persistconfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["cart"],
};

const reducers = combineReducers({
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistconfig, reducers);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [ PERSIST ],
      },
    }),
});
export default Store;