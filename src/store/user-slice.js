import { createSlice } from "@reduxjs/toolkit";

// A signed-out store. Logout must clear every per-customer collection, not just
// the token, or the previous session's cart stays on screen for the next one.
const emptyState = () => ({
  value: 0,
  user: {}, // {id: // token: //}
  profile: {}, //
  wishlist: [],
  cart: [],
  orders: [],
  address: [],
  authPending: false,
  authError: null,
});

// Rehydrate the session from localStorage, otherwise a page reload reads as
// logged out even with a valid token still stored.
const storedToken =
  typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;

const initialState = {
  ...emptyState(),
  user: storedToken ? { token: storedToken } : {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Auth request lifecycle. These are the only reducers in the slice that
    // carry loading/error state; the rest of the app still fails silently.
    authStarted(state) {
      state.authPending = true;
      state.authError = null;
    },
    authFailed(state, action) {
      state.authPending = false;
      state.authError = action.payload;
    },
    authErrorCleared(state) {
      state.authError = null;
    },
    userLogin(state, action) {
      state.user = action.payload;
      state.authPending = false;
      state.authError = null;
    },
    userSignup(state, action) {
      state.user = action.payload;
      state.authPending = false;
      state.authError = null;
    },
    userLogout() {
      return emptyState();
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
  authStarted,
  authFailed,
  authErrorCleared,
  userLogin,
  userSignup,
  userLogout,
  userProfile,
  addNewAddress,
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  placeOrder,
} = userSlice.actions;
export default userSlice.reducer;
