import { createSlice } from "@reduxjs/toolkit";

/* {
	"email":"abir@gmail.com",
	"phone": "01717030340",
	"car": "67c332527f7f854edf34d633",
	"shippingAddress": "Dhaka, Bangladesh",
	"quantity": 1
} */

type TOrderState = {
  email: string;
  phone: string;
  car: string;
  shippingAddress: string;
  quantity: number;
};

const initialState: TOrderState = {
  email: "",
  phone: "",
  car: "",
  shippingAddress: "",
  quantity: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state = action.payload;
    },
    clearOrder: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    },
  },
});

export const { setOrder, clearOrder } = orderSlice.actions;
