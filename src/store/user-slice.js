import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  user: {}, // {id: // token: //}
  profile: {}, //
  wishlist: [],
  cart: [],
  orders: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin(state, action) {
      state.user = action.payload;
    },
    userSignup(state, action) {
      state.user = action.payload;
    },
    userProfile(state, action) {
      state.profile = action.payload;
      state.wishlist = action.payload.wishlist;
      state.cart = action.payload.cart;
      state.address = action.payload.address;
      state.orders = action.payload.orders;
    },
    addNewAddress(state, action) {
      state.address = [...(state.address || []), action.payload];
    },
    addToWishlist(state, action) {
      // backend returns the customer's full, updated wishlist
      state.wishlist = action.payload;
    },
    removeFromWishlist(state, action) {
      state.wishlist = action.payload;
    },
    addToCart(state, action) {
      // backend returns the customer's full, updated cart
      state.cart = action.payload;
    },
    removeFromCart(state, action) {
      state.cart = action.payload;
    },
    placeOrder(state, action) {
      state.orders = [action.payload, ...state.orders];
      state.cart = [];
    },
  },
});

export const {
  userLogin,
  userSignup,
  userProfile,
  addNewAddress,
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  placeOrder,
} = userSlice.actions;
export default userSlice.reducer;
