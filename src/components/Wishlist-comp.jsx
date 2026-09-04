import { Trash2 } from "lucide-react";

const inter = { fontFamily: "'Inter', sans-serif" };

export const WishItem = ({ item, onTapRemove }) => {
  const { _id, name, desc, price, banner } = item;

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
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-amber-400"
        style={inter}
        onClick={() => onTapRemove(_id)}
      >
        <Trash2 size={16} />
        Remove
      </button>
    </div>
  );
};
