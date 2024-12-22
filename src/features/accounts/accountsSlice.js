const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposited": {
      return {
        ...state,
        balance: +state.balance + action.payload,
        isLoading: false,
      };
    }

    case "account/withdrawn": {
      return { ...state, balance: state.balance - action.payload };
    }

    case "account/requestedLoan": {
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    }

    case "account/paidLoan": {
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    }

    case "account/convertingCurrency": {
      return { ...state, isLoading: true };
    }

    default: {
      return state;
    }
  }
}

export const accountDeposited = (amount, currency) => {
  if (currency === "USD") {
    return {
      type: "account/deposited",
      payload: amount,
    };
  }

  return async (dispatch, getState) => {
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({
      type: "account/deposited",
      payload: Number((converted * amount).toFixed(2)),
    });
  };
};

export const accountWithdrawn = (amount) => ({
  type: "account/withdrawn",
  payload: amount,
});

export const accountRequestedLoan = (amount, purpose) => ({
  type: "account/requestedLoan",
  payload: { amount, purpose },
});

export const accountPaidLoan = () => ({
  type: "account/paidLoan",
});
