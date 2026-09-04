import { Link } from 'react-router-dom';

const ProductCard = ({ item }) => {
  const { _id, banner, price, name, desc, available } = item;

  return (
    <Link
      to={"/details/" + _id}
      className="group flex flex-col bg-white border border-black/10 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
        <img
          src={banner}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {!available && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
            No disponible
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 p-4">
        <p
          className="text-lg text-black font-medium"
          style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
        >
          {name}
        </p>
        <span className="text-sm text-black/60 line-clamp-2" style={{ fontFamily: "'Inter', sans-serif" }}>
          {desc}
        </span>
        <p
          className="text-black font-medium mt-1"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          ${price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export { ProductCard };
