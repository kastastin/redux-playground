const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
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

export const customerCreated = (fullName, nationalId) => ({
  type: "customer/created",
  payload: { fullName, nationalId, createdAt: new Date().toISOString() },
});

export const customerUpdatedName = (updatedName) => ({
  type: "customer/updatedName",
  payload: updatedName,
});
