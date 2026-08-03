import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { ShoppingBag, User } from "lucide-react";

export const Header = () => {
  const { user, cart } = useSelector((state) => state.userReducer);

  const { token } = user;

  const cartCount = Array.isArray(cart) ? cart.length : 0;

  return (
    <nav className="bg-black flex items-center justify-between px-5 sm:px-8 lg:px-10 py-4">
      <Link
        to="/"
        className="text-white text-xl"
        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, letterSpacing: "-0.05em" }}
      >
        AutosEnfasisI
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to={token ? "/login" : "/login"}
          className="relative text-white"
          aria-label="Cart"
        >
          <ShoppingBag size={20} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
        <Link to="/login" className="flex items-center gap-2 text-white text-sm">
          <User size={20} strokeWidth={1.5} />
          {!token && <span>Login</span>}
        </Link>
      </div>
    </nav>
  );
};
