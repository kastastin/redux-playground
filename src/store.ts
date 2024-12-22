import { configureStore } from "@reduxjs/toolkit";

import accountsReducer from "./features/accounts/accountsSlice";
import customersReducer from "./features/customers/customersSlice";

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    customers: customersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
