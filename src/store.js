import { createStore, combineReducers } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposited": {
      return { ...state, balance: state.balance + action.payload };
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

    default: {
      return state;
    }
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/created": {
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    }

    case "customer/updatedName": {
      return {
        ...state,
        fullName: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

store.dispatch({ type: "account/deposited", payload: 500 });
store.dispatch({
  type: "account/requestedLoan",
  payload: { amount: 4000, purpose: "Buy a car" },
});
store.dispatch({ type: "account/paidLoan" });

// Account Action Creators
const accountDeposited = (amount) => ({
  type: "account/deposited",
  payload: amount,
});
const accountWithdrawn = (amount) => ({
  type: "account/withdrawn",
  payload: amount,
});
const accountRequestedLoan = (amount, purpose) => ({
  type: "account/requestedLoan",
  payload: { amount, purpose },
});
const accountPaidLoan = () => ({
  type: "account/paidLoan",
});

store.dispatch(accountDeposited(1000));
store.dispatch(accountWithdrawn(1000));
store.dispatch(accountRequestedLoan(5000, "Buy a car"));
store.dispatch(accountPaidLoan());

// Customer Action Creators
const customerCreated = (fullName, nationalId) => ({
  type: "customer/created",
  payload: { fullName, nationalId, createdAt: new Date().toISOString() },
});
const customerUpdatedName = (updatedName) => ({
  type: "customer/updatedName",
  payload: updatedName,
});

store.dispatch(customerCreated("Bob Builder", "EN394843"));
store.dispatch(customerUpdatedName("Tom Builder"));

console.log(store.getState());
