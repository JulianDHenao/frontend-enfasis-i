import React, { useState, useEffect } from "react";
import { ShoppingCart, Heart, ListOrdered, Gift } from "lucide-react";
import {
  onRemoveFromWishlist,
  onViewProfile,
  onAddToCart,
  onRemoveFromCart,
  onCreateAddress,
  onPlaceOrder,
} from "../store/actions";
import { AddressComponent } from "../components/Address-comp";
import { CartItem } from "../components/Cart-comp";
import { WishItem } from "../components/Wishlist-comp";
import { OrderItem } from "../components/Order-comp";

import { useAppDispatch, useAppSelector } from "../store/hooks";

const dmSans = { fontFamily: "'DM Sans', sans-serif" };
const inter = { fontFamily: "'Inter', sans-serif" };

const TABS = [
  { key: "cart", label: "Cart", icon: ShoppingCart },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "orders", label: "Orders", icon: ListOrdered },
];

const Profile = () => {
  const { user, wishlist, cart, orders, address } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState("cart");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const { token } = user;

  useEffect(() => {
    if (token) {
      dispatch(onViewProfile());
    }
  }, [token]);

  const onAdd = ({ _id, qty }) => {
    dispatch(onAddToCart({ _id, qty }));
  };

  const onRemove = ({ _id }) => {
    dispatch(onRemoveFromCart(_id));
  };

  const removeFromWishlist = (_id) => {
    dispatch(onRemoveFromWishlist(_id));
  };

  const onTapPlaceOrder = () => {
    dispatch(onPlaceOrder({ txnId: "72365ffdds" }));
  };

  const addNewAddress = () => {
    dispatch(onCreateAddress({ street, postalCode, city, country }));
  };

  const emptyState = (message) => (
    <div className="flex items-center justify-center h-64 text-black/40" style={inter}>
      {message}
    </div>
  );

  const totalAmount = Array.isArray(cart)
    ? cart.reduce((sum, { unit, product }) => sum + unit * product.price, 0)
    : 0;

  return (
    <div className="min-h-screen bg-[#F5F5F3] px-5 sm:px-8 lg:px-10 py-8">
      {Array.isArray(address) && address.length ? (
        <div className="mb-8">
          <label className="block mb-2 text-sm text-black/60" style={inter}>
            Tu dirección de entrega
          </label>
          <AddressComponent address={address} />
        </div>
      ) : (
        <form className="mb-8 bg-white p-5 rounded-lg max-w-3xl" style={inter}>
          <h2 className="text-2xl mb-4" style={dmSans}>
            Dirección de entrega
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Calle</label>
              <input
                type="text"
                onChange={(e) => setStreet(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2"
                placeholder="1234 Main St"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Ciudad</label>
              <input
                type="text"
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Departamento/Estado</label>
              <input
                type="text"
                onChange={(e) => setState(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Código postal</label>
              <input
                type="text"
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">País</label>
              <input
                type="text"
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2"
              />
            </div>
          </div>
          <button
            type="button"
            className="mt-4 px-5 py-2 rounded-md bg-black text-white"
            onClick={addNewAddress}
          >
            Guardar dirección
          </button>
        </form>
      )}

      <div className="bg-white rounded-t-lg px-4 sm:px-6 pt-4">
        <p className="text-2xl sm:text-3xl mb-4" style={{ ...dmSans, color: "#4179CF" }}>
          Mi cuenta
        </p>
        <div className="flex gap-1 border-b border-black/10">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-colors ${
                activeTab === key
                  ? "border-black text-black"
                  : "border-transparent text-black/40"
              }`}
              style={inter}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-b-lg p-4 sm:p-6 min-h-[20rem]">
        {activeTab === "cart" &&
          (Array.isArray(cart) && cart.length ? (
            <div>
              {cart.map((item, i) => (
                <CartItem key={i} cart={cart} item={item} onAdd={onAdd} onRemove={onRemove} />
              ))}
            </div>
          ) : (
            emptyState("Tu carrito está vacío!")
          ))}

        {activeTab === "wishlist" &&
          (Array.isArray(wishlist) && wishlist.length ? (
            <div>
              {wishlist.map((item, i) => (
                <WishItem key={i} item={item} onTapRemove={removeFromWishlist} />
              ))}
            </div>
          ) : (
            emptyState("Tu wishlist está vacía!")
          ))}

        {activeTab === "orders" &&
          (Array.isArray(orders) && orders.length ? (
            <div>
              {orders.map((item, i) => (
                <OrderItem key={i} item={item} onTapViewMore={() => {}} />
              ))}
            </div>
          ) : (
            emptyState("No tienes pedidos todavía!")
          ))}
      </div>

      {Array.isArray(cart) && cart.length > 0 && (
        <div className="bg-white rounded-lg mt-4 p-4 flex flex-wrap items-center justify-between gap-4">
          <span className="text-lg" style={inter}>
            Total: <span className="font-bold ml-2">${totalAmount.toLocaleString()}</span>
          </span>
          <button
            className="flex items-center gap-2 px-5 py-3 rounded-md bg-black text-white"
            style={inter}
            onClick={onTapPlaceOrder}
          >
            <Gift size={18} />
            Realizar Pedido
          </button>
        </div>
      )}
    </div>
  );
};

export { Profile };
