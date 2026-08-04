import React, { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { onGetProducts } from "../store/actions";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const dmSans = { fontFamily: "'DM Sans', sans-serif" };
const inter = { fontFamily: "'Inter', sans-serif" };

const Vehicles = () => {
  const { categories, products } = useAppSelector((state) => state.shoppingReducer);
  const dispatch = useAppDispatch();
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    dispatch(onGetProducts());
  }, []);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((item) => item.type === activeCategory);

  return (
    <div className="min-h-screen bg-[#F5F5F3]">
      <div className="px-5 sm:px-8 lg:px-10 pt-10 pb-6">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl text-black"
          style={{ ...dmSans, fontWeight: 400, letterSpacing: "-0.05em" }}
        >
          Nuestros Vehículos
        </h1>
        <p className="text-black/60 mt-2 text-base sm:text-lg" style={inter}>
          Encuentra el vehículo ideal para ti.
        </p>
      </div>

      <div className="px-5 sm:px-8 lg:px-10 flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-full text-sm transition-colors ${activeCategory === "all" ? "bg-black text-white" : "bg-white text-black"
            }`}
          style={inter}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm capitalize transition-colors ${activeCategory === cat ? "bg-black text-white" : "bg-white text-black"
              }`}
            style={inter}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="px-5 sm:px-8 lg:px-10 pb-16">
        {products.length === 0 ? (
          <p className="text-black/50" style={inter}>
            Cargando vehículos...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { Vehicles };
