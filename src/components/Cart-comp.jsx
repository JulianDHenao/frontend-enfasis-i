import { Minus, Plus } from "lucide-react";

const inter = { fontFamily: "'Inter', sans-serif" };

export const CartItem = ({ item, cart, onAdd, onRemove }) => {
  const { _id } = item?.product || {};

  const currentUnit =
    Array.isArray(cart) ? cart.find(({ product }) => product?._id === _id)?.unit || 0 : 0;

  const addCart = () => {
    const newUnit = currentUnit + 1;
    onAdd({ _id, qty: newUnit });
  };

  const removeCart = () => {
    if (!item) return;
    const newUnit = currentUnit - 1;
    if (newUnit > 0) onAdd({ _id, qty: newUnit });
    else onRemove({ _id });
  };

  if (!item || !item.product) {
    return null;
  }

  const { name, desc, price, banner } = item.product;

  return (
    <div className="flex items-center gap-4 mb-3 p-3 border border-black/10 rounded-lg bg-white">
      <img src={banner} alt={name} className="w-24 h-16 object-cover rounded" />
      <div className="flex-1">
        <p className="font-medium" style={inter}>
          {name}
        </p>
        <p className="text-black/50 text-sm" style={inter}>
          {desc}
        </p>
        <span style={inter}>${price?.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="w-9 h-9 flex items-center justify-center rounded-md bg-amber-400"
          onClick={removeCart}
        >
          <Minus size={16} />
        </button>
        <span className="text-xl w-6 text-center">{currentUnit}</span>
        <button
          className="w-9 h-9 flex items-center justify-center rounded-md bg-amber-400"
          onClick={addCart}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};
