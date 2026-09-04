import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { onGetProducts } from "../store/actions";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const dmSans = { fontFamily: "'DM Sans', sans-serif" };
const inter = { fontFamily: "'Inter', sans-serif" };

const Vehicles = () => {
  const { categories, products } = useAppSelector((state) => state.shoppingReducer);
  const dispatch = useAppDispatch();
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    dispatch(onGetProducts());
  }, [dispatch]);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((item) => item.type === activeCategory);
  const visibleProducts = [...filteredProducts]
    .filter((item) => `${item.name} ${item.desc} ${item.type}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#F5F5F3]">
      <div className="px-5 sm:px-8 lg:px-10 pt-10 pb-6 bg-[#101411] text-white">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl text-white"
          style={{ ...dmSans, fontWeight: 400, letterSpacing: "-0.05em" }}
        >
          Nuestros Vehículos
        </h1>
        <p className="text-white/65 mt-2 text-base sm:text-lg" style={inter}>
          Encuentra el vehículo ideal para ti.
        </p>
      </div>

      <div className="px-5 sm:px-8 lg:px-10 pt-6 pb-2 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-xl">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por marca, modelo o categoría"
            aria-label="Buscar vehículos"
            className="w-full h-12 pl-11 pr-4 bg-white border border-black/10 rounded-md outline-none focus:border-black transition-colors"
            style={inter}
          />
        </div>
        <label className="relative flex items-center gap-2 h-12 px-4 bg-white border border-black/10 rounded-md text-sm" style={inter}>
          <ArrowUpDown size={16} aria-hidden="true" />
          <span className="sr-only">Ordenar vehículos</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="bg-transparent outline-none appearance-none pr-5 cursor-pointer">
            <option value="featured">Recomendados</option>
            <option value="price-low">Precio menor</option>
            <option value="price-high">Precio mayor</option>
          </select>
        </label>
      </div>

      <div className="px-5 sm:px-8 lg:px-10 flex flex-wrap items-center gap-2 mb-8 pt-3">
        <span className="inline-flex items-center gap-2 mr-2 text-sm text-black/50" style={inter}>
          <SlidersHorizontal size={15} aria-hidden="true" /> {visibleProducts.length} vehículos
        </span>
        <button
          onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm transition-colors border border-black/10 ${activeCategory === "all" ? "bg-[#D4F26A] text-black" : "bg-white text-black"
            }`}
          style={inter}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm capitalize transition-colors border border-black/10 ${activeCategory === cat ? "bg-[#D4F26A] text-black" : "bg-white text-black"
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
            {visibleProducts.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        )}
        {products.length > 0 && visibleProducts.length === 0 && (
          <div className="border border-dashed border-black/20 bg-white/50 p-12 text-center">
            <p className="text-xl mb-2" style={dmSans}>No encontramos ese vehículo.</p>
            <p className="text-black/50" style={inter}>Prueba otra búsqueda o cambia la categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { Vehicles };
