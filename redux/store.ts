import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/api";
import AppReducer from "./features/app/appSlice";
import ComponentsReducer from "./features/components/componentsSlice";

// root reducer
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  app: AppReducer,
  components: ComponentsReducer,
});

export const store = configureStore({
  // reducer: persistedReducer,
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
})

export const makeStore = () =>{
  return store;
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
