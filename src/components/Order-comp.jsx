import React from "react";
import { Eye } from "lucide-react";

const inter = { fontFamily: "'Inter', sans-serif" };

export const OrderItem = ({ item, onTapViewMore }) => {
  const { _id, orderId, amount } = item;

  return (
    <div className="flex items-center justify-between gap-4 mb-3 p-4 border border-black/10 rounded-lg bg-white">
      <span style={inter}>Order ID: {orderId}</span>
      <span className="font-medium" style={inter}>
        ${amount?.toLocaleString()}
      </span>
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-amber-400"
        style={inter}
        onClick={() => onTapViewMore(_id)}
      >
        <Eye size={16} />
        Ver detalles
      </button>
    </div>
  );
};
