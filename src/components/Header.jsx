import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { ShoppingBag, User } from "lucide-react";

export const Header = () => {
  const { user, cart } = useSelector((state) => state.userReducer);

  const { token } = user;

  const cartCount = Array.isArray(cart) ? cart.length : 0;

  return (
    <nav className="bg-[#101411] text-white flex items-center justify-between px-5 sm:px-8 lg:px-10 py-4 border-b border-white/10">
      <Link
        to="/"
        className="text-white text-xl"
        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, letterSpacing: "-0.05em" }}
      >
        AutosEnfasis-I
      </Link>

      <div className="flex items-center gap-5">
        <Link to="/vehicles" className="hidden sm:block text-sm text-white/70 hover:text-white transition-colors">
          Explorar
        </Link>
        <Link
          to={token ? "/profile" : "/login"}
          className="relative text-white"
          aria-label="Ver carrito"
        >
          <ShoppingBag size={20} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
        <Link to={token ? "/profile" : "/login"} className="flex items-center gap-2 text-white text-sm">
          <User size={20} strokeWidth={1.5} />
          <span>{token ? "Mi cuenta" : "Ingresar"}</span>
        </Link>
      </div>
    </nav>
  );
};
