import { DeleteData, GetData, PostData } from '../../utils'
import { landingProducts, productDetails } from '../shpping-slice'
import {
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  addNewAddress,
  placeOrder,
} from '../user-slice'

const getCustomerId = (_dispatch, getState) => {
  const { user } = getState().userReducer;
  return user.customer?._id || user.customer?.id;
};

const normalizeCart = (cart) => (cart?.items || []).map((item) => ({
  unit: item.quantity,
  product: { _id: item.productId, name: item.name, price: item.price, desc: '' },
}));


export const onGetProducts = () => async(dispatch) => {

    try {

        const response = await GetData('/products');

        dispatch(landingProducts(response.data));


    } catch (err) {
      console.log(err)
    }

  };


  export const onGetProductDetails = (id) => async(dispatch) => {

    try {

        const response = await GetData('/products/'+id);

        dispatch(productDetails(response.data));


    } catch (err) {
      console.log(err)
    }

  };

  /* ------------------- Wishlist --------------------- */

  export const onAddToWishlist = (_id) => async(dispatch, getState) => {


    try {

        const response = await PostData(`/customer/${getCustomerId(dispatch, getState)}/wishlist`, { productId: _id });

        dispatch(addToWishlist(response.data.map((id) => ({ _id: id }))));


    } catch (err) {
      console.log(err)
    }

  };


  export const onRemoveFromWishlist = (_id) => async(dispatch, getState) => {

    try {

        const response = await DeleteData(`/customer/${getCustomerId(dispatch, getState)}/wishlist/${_id}`);

        dispatch(removeFromWishlist(response.data.map((id) => ({ _id: id }))));

    } catch (err) {
      console.log(err)
    }

  };



  /* ------------------- Cart --------------------- */

  export const onAddToCart = ({ _id, qty }) => async(dispatch, getState) => {

    try {

        const product = getState().shoppingReducer.products.find((item) => item._id === _id)
          || getState().shoppingReducer.currentProduct;
        const customerId = getCustomerId(dispatch, getState);
        const response = await PostData('/shopping/cart', {
          customerId,
          productId: _id,
          name: product.name,
          price: product.price,
          quantity: qty,
        });

        dispatch(addToCart(normalizeCart(response.data)));


    } catch (err) {
      console.log(err)
    }

  };


  export const onRemoveFromCart = (_id) => async(dispatch, getState) => {

    try {

        const customerId = getCustomerId(dispatch, getState);
        const response = await DeleteData(`/shopping/cart/${customerId}/items/${_id}`);

        dispatch(removeFromCart(normalizeCart(response.data)));

    } catch (err) {
      console.log(err)
    }

  };


 export const onCreateAddress = ({ street, postalCode, city, state, country }) => async (dispatch, getState) => {
    try {
        const { user } = getState().userReducer;
        
        // ¡Aquí está la magia! Buscamos el ID dentro de user.customer
        const userId = user.customer?._id || user.customer?.id; 

        if (!userId) {
            console.error("No se encontró el ID en user.customer:", user);
            alert("No se pudo obtener el ID del usuario.");
            return;
        }

        const response = await PostData(`/customer/${userId}/address`, {
          street, 
          postalCode,
          city,
          state, 
          country
        });

        dispatch(addNewAddress(response.data));

    } catch (err) {
      console.log(err)
    }
  };


  export const onPlaceOrder = ({txnId }) => async(dispatch) => {

    try {

        const response = await PostData('/shopping/order/', {
          txnId
        });

        dispatch(placeOrder(response.data));

    } catch (err) {
      console.log(err)
    }

  };
