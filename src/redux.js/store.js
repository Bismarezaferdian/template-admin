import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import allUserReducer from "./allUserRedux";
import productReducer from "./productRedux";
import orderReducer from "./orderRedux";
import categoriesReducer from "./category";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// console.log(userReducer);
// console.log(allUserReducer);
const rootReducer = combineReducers({
  user: userReducer,
  allUser: allUserReducer,
  product: productReducer,
  order: orderReducer,
  categorie: categoriesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

// export default configureStore({
//   reducer: {
//     cart: cartReducer,
//     user: userReducer,
//     product: productReducer,
//   },
// });
