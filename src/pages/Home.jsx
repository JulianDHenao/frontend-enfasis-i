import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  CornerUpLeft,
  Menu,
  X,
  ArrowUpRight,
  FlaskConical,
  Leaf,
  Droplets,
  Sun,
} from "lucide-react";

// const BG_IMAGE =
//   "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_110248_b62f758d-f68c-4045-a7b4-91771d6d0a0f.png&w=1280&q=85";
// const AVATAR_IMAGE =
//   "https://polo-pecan-73837341.figma.site/_assets/v11/ca8093996e970200cbcf8bde8744175e52da5a79.png";
// const CAPSULE_IMAGE =
//   "https://polo-pecan-73837341.figma.site/_assets/v11/6a7de4fbe9c9e2315040607320a9ff5e93117bf4.png";
// const PRODUCT_IMAGE =
//   "https://polo-pecan-73837341.figma.site/_assets/v11/50ad042b3cd48a2e120ea3ba17c8cfeaf3cc334c.png";
// const PANEL1_DECORATION =
//   "https://polo-pecan-73837341.figma.site/_assets/v11/6736cbe6e26afa2cd7c04a91892a79f7640785b5.png";
// const PANEL3_PRODUCT =
//   "https://polo-pecan-73837341.figma.site/_assets/v11/30e8f38d1f993c357a3be2721557fc899d5640fc.png";


const BG_IMAGE =
  "https://img.magnific.com/vector-gratis/fondo-brillo-negro-realista_23-2150060296.jpg?semt=ais_hybrid&w=740&q=80";
const AVATAR_IMAGE =
  "https://polo-pecan-73837341.figma.site/_assets/v11/ca8093996e970200cbcf8bde8744175e52da5a79.png";
const CAPSULE_IMAGE =
  "https://polo-pecan-73837341.figma.site/_assets/v11/6a7de4fbe9c9e2315040607320a9ff5e93117bf4.png";
const PRODUCT_IMAGE =
  "https://www.freeiconspng.com/uploads/red-sports-car-png-1.png";
const PANEL1_DECORATION =
  "https://marketing4ecommerce.co/wp-content/uploads/2021/05/VendeTuNave.jpg";
const PANEL3_PRODUCT =
  "https://polo-pecan-73837341.figma.site/_assets/v11/30e8f38d1f993c357a3be2721557fc899d5640fc.png";

const NAV_LINKS = ["About", "Products", "Promotions", "Contact"];

const CAROUSEL_CARDS = [
  {
    icon: FlaskConical,
    bg: "bg-black",
    text: "Vehiculo 1",
  },
  {
    icon: Leaf,
    bg: "bg-emerald-800",
    text: "Vehiculo 2",
  },
  {
    icon: Droplets,
    bg: "bg-cyan-800",
    text: "Vehiculo 3",
  },
  {
    icon: Sun,
    bg: "bg-amber-700",
    text: "Vehiculo 3",
  },
];

const dmSans = { fontFamily: "'DM Sans', sans-serif" };
const inter = { fontFamily: "'Inter', sans-serif" };

const Word = ({ children, delay, dim, className = "" }) => (
  <span className={`inline-block overflow-hidden ${className}`}>
    <span
      className={`inline-block animate-word-reveal ${delay} ${dim ? "text-white/45" : "text-white"
        }`}
    >
      {children}
    </span>
  </span>
);

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % CAROUSEL_CARDS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const headlineSize =
    "text-[48px] leading-[50px] sm:text-[80px] sm:leading-[72px] md:text-[110px] md:leading-[95px] lg:text-[130px] lg:leading-[110px] xl:text-[155px] xl:leading-[125px]";

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navbar */}
      <nav className="animate-fade-in flex items-center justify-between px-5 sm:px-8 lg:px-10 py-4 lg:py-5 relative z-20">
        <span
          className="animate-slide-left delay-200 text-white text-[30px]"
          style={{ ...dmSans, fontWeight: 500, letterSpacing: "-0.05em" }}
        >
          AutosEnfasis-I
        </span>

        <div
          className="animate-fade-in delay-400 hidden lg:flex items-center gap-10 text-white/90 text-lg"
          style={{ ...dmSans, fontWeight: 500 }}
        >
          {NAV_LINKS.map((link) =>
            link === "Products" ? (
              <Link key={link} to="/vehicles" className="hover:text-white transition-colors">
                {link}
              </Link>
            ) : (
              <a key={link} href="#" className="hover:text-white transition-colors">
                {link}
              </a>
            )
          )}
        </div>

        {/* <div className="animate-slide-right delay-300 flex items-center gap-4 sm:gap-5">
          <button aria-label="Search" className="text-white">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button aria-label="Cart" className="text-white">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>
          <button aria-label="Returns" className="text-white">
            <CornerUpLeft size={20} strokeWidth={1.5} />
          </button>
          <img
            src={AVATAR_IMAGE}
            alt="Account"
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
          />
          <button
            aria-label="Toggle menu"
            className="md:hidden text-white"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div> */}
      </nav>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/90 z-30 flex flex-col items-center justify-center gap-8">
          <button
            aria-label="Close menu"
            className="absolute top-5 right-5 text-white"
            onClick={() => setMenuOpen(false)}
          >
            <X size={28} />
          </button>
          {NAV_LINKS.map((link) =>
            link === "Products" ? (
              <Link
                key={link}
                to="/vehicles"
                className="text-2xl text-white"
                style={dmSans}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </Link>
            ) : (
              <a
                key={link}
                href="#"
                className="text-2xl text-white"
                style={dmSans}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            )
          )}
        </div>
      )}

      {/* Hero content */}
      <section className="flex-1 flex flex-col justify-center px-5 sm:px-8 lg:px-10 relative z-20">
        <h1 className={headlineSize} style={{ ...dmSans, fontWeight: 400, letterSpacing: "-0.05em" }}>
          <div>
            <Word delay="delay-300">Adquirir</Word>{" "}
            <Word delay="delay-400">Tu</Word>{" "}
            <Word delay="delay-500" dim>Vehículo</Word>
          </div>
          <div>
            <Word delay="delay-600" dim>De</Word>{" "}
            <Word delay="delay-800">Confianza</Word>
          </div>
          <div>
            <img
              src={CAPSULE_IMAGE}
              alt=""
              className="hidden sm:inline-block align-middle ml-2 lg:ml-4 w-auto animate-scale-in delay-1000"
              style={{ height: "clamp(60px, 10vw, 160px)" }}
            />
          </div>
        </h1>

        <div className="animate-fade-up delay-600 mt-8 sm:mt-12 lg:mt-[75px] flex flex-col sm:flex-row gap-5 sm:gap-8 lg:gap-[50px]">
          <Link
            to="/vehicles"
            className="bg-black text-white rounded-md w-full sm:w-[240px] md:w-[280px] lg:w-[310px] h-14 sm:h-16 lg:h-[72px] flex items-center justify-center gap-2 text-base sm:text-xl lg:text-2xl"
            style={{ ...inter, fontWeight: 500, letterSpacing: "-0.03em" }}
          >
            Explore Now
            <ArrowUpRight size={22} />
          </Link>
          <p
            className="text-white max-w-[310px] text-sm sm:text-base lg:text-lg"
            style={{ ...inter, fontWeight: 400, lineHeight: 1.45, letterSpacing: "-0.03em" }}
          >
            Descubre el vehículo a tu medida.
          </p>
        </div>
      </section>

      {/* Mobile/tablet product image */}
      <div className="lg:hidden relative z-10">
        <img
          src={PRODUCT_IMAGE}
          alt="AutosEnfasis-I product"
          className="animate-scale-in delay-800 w-[180%] sm:w-[151%] max-w-[1296px] object-contain mx-auto drop-shadow-2xl"
          style={{ marginBottom: "-180px" }}
        />
      </div>

      {/* Bottom 3-panel grid */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr] relative z-10">
        {/* Panel 1 */}
        <div className="animate-fade-up delay-900 bg-[#ECEDEC] relative overflow-hidden p-8 sm:p-10 lg:p-12 min-h-[280px] flex flex-col justify-between">
          <p
            className="max-w-[350px] text-2xl sm:text-[28px] lg:text-[35px] leading-[1.1]"
            style={{ ...dmSans, fontWeight: 400, letterSpacing: "-0.05em" }}
          >
            ¡Realiza el proceso de contratación hoy!
          </p>
          <a
            href="#"
            className="underline text-base lg:text-lg mt-6 relative z-10 w-fit"
            style={{ ...inter, fontWeight: 400, letterSpacing: "-0.03em" }}
          >
            Personal Assessment
          </a>
          <img
            src={PANEL1_DECORATION}
            alt=""
            className="absolute right-0 bottom-0 h-full object-contain"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>

        {/* Panel 2 */}
        <div className="animate-fade-up delay-1000 bg-[#FEFDF9] p-8 sm:p-10 lg:p-12 min-h-[280px] flex flex-col justify-between">
          <div className="relative flex-1">
            {CAROUSEL_CARDS.map((card, i) => {
              const Icon = card.icon;
              const isActive = i === activeCard;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-4 transition-all duration-700 ${isActive
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 absolute inset-0"
                    }`}
                >
                  <div
                    className={`shrink-0 rounded-full ${card.bg} text-white flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12`}
                  >
                    <Icon size={20} />
                  </div>
                  <p
                    className="text-black/80 text-sm sm:text-base lg:text-lg"
                    style={{ ...inter, fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.03em" }}
                  >
                    {card.text}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2 mt-6">
            {CAROUSEL_CARDS.map((_, i) => (
              <div
                key={i}
                className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${i === activeCard ? "bg-black" : "bg-black/20"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Panel 3 */}
        <div className="animate-fade-up delay-1100 bg-black p-8 sm:p-10 lg:p-12 min-h-[280px] flex items-center gap-6">
          <img
            src={PANEL3_PRODUCT}
            alt="AutosEnfasisI product"
            className="w-[120px] h-[82px] sm:w-[160px] sm:h-[110px] lg:w-[208px] lg:h-[142px] object-contain shrink-0"
          />
          <div>
            <p
              className="text-white text-2xl sm:text-3xl lg:text-[35px]"
              style={{ ...inter, fontWeight: 400, letterSpacing: "-0.05em" }}
            >
              +1000
            </p>
            <p
              className="text-white/60 text-sm sm:text-base lg:text-lg"
              style={{ ...inter, fontWeight: 400, lineHeight: 1.2 }}
            >
              Cada persona ya tiene su vehículo
            </p>
          </div>
        </div>
      </div>

      {/* Desktop floating product image */}
      <img
        src={PRODUCT_IMAGE}
        alt="AutosEnfasisI product"
        className="animate-scale-in delay-700 hidden lg:block absolute z-0"
        style={{
          width: "clamp(600px, 80vw, 1412px)",
          height: "auto",
          bottom: "-10%",
          right: "clamp(-400px, -20vw, -100px)",
        }}
      />
    </div>
  );
};

export { Home };
