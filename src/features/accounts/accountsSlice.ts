import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../../store";

export interface AccountState {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
}

const initialState: AccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
      state.isLoading = false;
    },

    withdraw: (state, action: PayloadAction<number>) => {
      state.balance -= action.payload;
    },

    requestLoan: (
      state,
      action: PayloadAction<{ amount: number; purpose: string }>
    ) => {
      if (state.loan > 0) return state;
      state.balance += action.payload.amount;
      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.purpose;
    },

    payLoan: (state) => {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },

    convertingCurrency: (state) => {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan, convertingCurrency } =
  accountSlice.actions;

export const deposit = (amount: number, currency: string) => {
  if (currency === "USD") {
    return accountSlice.actions.deposit(amount);
  }

  return async (dispatch: AppDispatch) => {
    dispatch({ type: "convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch(
      accountSlice.actions.deposit(Number((converted * amount).toFixed(2)))
    );
  };
};

export default accountSlice.reducer;
