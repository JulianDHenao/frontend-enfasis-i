import { GetData, PostData } from "../../utils";
import {
  authStarted,
  authFailed,
  authErrorCleared,
  userLogin,
  userSignup,
  userLogout,
  userProfile,
} from "../user-slice";

// The API answers in English (see backend utils/app-errors.js); UI copy is
// Spanish. Anything unmapped falls back to a generic message rather than
// leaking a raw server string into the interface.
const API_ERROR_MESSAGES = {
  "Invalid credentials": "Correo o contraseña incorrectos.",
  "Email already registered": "Ese correo ya tiene una cuenta registrada.",
};

const describeAuthError = (err) => {
  if (!err?.response) {
    return "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.";
  }
  const apiMessage = err.response.data?.message;
  if (apiMessage && API_ERROR_MESSAGES[apiMessage]) {
    return API_ERROR_MESSAGES[apiMessage];
  }
  if (err.response.status >= 500) {
    return "El servidor tuvo un problema. Inténtalo de nuevo en un momento.";
  }
  return "No pudimos completar la operación. Revisa los datos e inténtalo de nuevo.";
};

export const onClearAuthError = () => (dispatch) => dispatch(authErrorCleared());

export const SetAuthToken = async (token) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.clear();
  }
};

export const onSignup =
  ({ name, email, password, phone }) => // 1. Agregamos 'name' aquí arriba
  async (dispatch) => {
    try {
      dispatch(authStarted());
      const response = await PostData("/customer/signup", {
        name, // 2. Y lo agregamos al objeto que se envía al servidor
        email,
        password,
        phone,
      });
      const { token } = response.data;
      await SetAuthToken(token);
      return dispatch(userSignup(response.data));
    } catch (err) {
      return dispatch(authFailed(describeAuthError(err)));
    }
  };
export const onLogin =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(authStarted());
      const response = await PostData("/customer/login", {
        email,
        password,
      });

      const { token } = response.data;
      await SetAuthToken(token);

      return dispatch(userLogin(response.data));
    } catch (err) {
      return dispatch(authFailed(describeAuthError(err)));
    }
  };

// Auth is stateless JWT, so signing out is purely client-side: drop the stored
// token and reset the store. Nothing to call on the API.
export const onLogout = () => async (dispatch) => {
  await SetAuthToken(null);
  return dispatch(userLogout());
};

export const onViewProfile = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const customerId = JSON.parse(atob(token.split('.')[1])).id;
    const [profileResponse, cartResponse, ordersResponse] = await Promise.all([
      GetData(`/customer/${customerId}`),
      GetData(`/shopping/cart/${customerId}`),
      GetData(`/shopping/orders/${customerId}`),
    ]);

    const profile = profileResponse.data;
    return dispatch(userProfile({
      ...profile,
      address: profile.addresses || [],
      wishlist: (profile.wishlist || []).map((id) => ({ _id: id })),
      cart: (cartResponse.data.items || []).map((item) => ({
        unit: item.quantity,
        product: { _id: item.productId, name: item.name, price: item.price, desc: '' },
      })),
      orders: ordersResponse.data,
    }));
  } catch (err) {
    console.log(err);
  }
};
