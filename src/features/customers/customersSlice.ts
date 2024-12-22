import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CustomerState {
  fullName: string;
  nationalId: string;
  createdAt: string;
}

const initialState: CustomerState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

export const accountSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    create: (
      state,
      action: PayloadAction<{ fullName: string; nationalId: string }>
    ) => {
      state.fullName = action.payload.fullName;
      state.nationalId = action.payload.nationalId;
      state.createdAt = new Date().toISOString();
    },

    updateName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
    },
  },
});

export const { create, updateName } = accountSlice.actions;

export default accountSlice.reducer;
