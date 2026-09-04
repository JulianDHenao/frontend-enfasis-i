import { Trash2, Pencil } from "lucide-react";

const inter = { fontFamily: "'Inter', sans-serif" };

export const AddressComponent = ({ address }) => {
  const addressCard = ({ street, postalCode, city, country }, key) => (
    <div
      key={key}
      className="min-w-[220px] bg-white p-4 rounded-lg border border-black/10 flex flex-col justify-between gap-3"
    >
      <div>
        <span className="inline-block text-xs bg-amber-400 rounded px-2 py-0.5 mb-2" style={inter}>
          Default Address
        </span>
        <p className="font-medium" style={inter}>
          {street}
        </p>
        <span className="text-black/60 text-sm" style={inter}>
          {postalCode}, {city}, {country}
        </span>
      </div>
      <div className="flex gap-2 self-end">
        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-black/5">
          <Trash2 size={14} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-black/5">
          <Pencil size={14} />
        </button>
      </div>
    </div>
  );

  const listOfAddress = () => {
    if (Array.isArray(address)) {
      return address.map((item, i) => addressCard(item, i));
    }
    return <p style={inter}>Sin direcciones disponibles</p>;
  };

  return <div className="flex flex-row flex-nowrap gap-4 overflow-auto">{listOfAddress()}</div>;
};
