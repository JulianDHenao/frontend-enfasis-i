import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  BadgeCheck,
  Wrench,
  Gauge,
} from "lucide-react";

const BG_IMAGE =
  "https://img.magnific.com/vector-gratis/fondo-brillo-negro-realista_23-2150060296.jpg?semt=ais_hybrid&w=740&q=80";
const PRODUCT_IMAGE =
  "https://www.freeiconspng.com/uploads/red-sports-car-png-1.png";
const PANEL1_DECORATION =
  "https://marketing4ecommerce.co/wp-content/uploads/2021/05/VendeTuNave.jpg";

const NAV_LINKS = [
  { label: "Vehículos", to: "/vehicles" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Mi cuenta", to: "/login" },
];

const CAROUSEL_CARDS = [
  {
    icon: ShieldCheck,
    bg: "bg-neutral-900",
    text: "Garantía mecánica de 12 meses en cada vehículo.",
  },
  {
    icon: BadgeCheck,
    bg: "bg-emerald-800",
    text: "Peritaje certificado de 150 puntos antes de la entrega.",
  },
  {
    icon: Wrench,
    bg: "bg-cyan-800",
    text: "Primer mantenimiento incluido en nuestros talleres.",
  },
  {
    icon: Gauge,
    bg: "bg-amber-700",
    text: "Historial de kilometraje verificado y sin reportes.",
  },
];

const CAROUSEL_INTERVAL = 5000;

const dmSans = { fontFamily: "'DM Sans', sans-serif" };
const inter = { fontFamily: "'Inter', sans-serif" };

// Shared focus treatment so keyboard users can always see where they are.
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm";
const focusRingDark =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm";

const Word = ({ children, delay, dim, className = "" }) => (
  <span className={`inline-block overflow-hidden align-bottom ${className}`}>
    <span
      className={`inline-block animate-word-reveal ${delay} ${
        dim ? "text-white/50" : "text-white"
      }`}
    >
      {children}
    </span>
  </span>
);

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const menuButtonRef = useRef(null);
  const wasMenuOpen = useRef(false);

  // Autoplay pauses on hover/focus so the copy stays readable.
  useEffect(() => {
    if (carouselPaused) return;
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % CAROUSEL_CARDS.length);
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(interval);
  }, [carouselPaused]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Send focus back to the toggle once the overlay closes.
  useEffect(() => {
    if (menuOpen) {
      wasMenuOpen.current = true;
      return;
    }
    if (wasMenuOpen.current) {
      wasMenuOpen.current = false;
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  // Escape closes the overlay and the page behind it stops scrolling while open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen, closeMenu]);

  const renderNavLink = (link, className, onClick) =>
    link.to ? (
      <Link key={link.label} to={link.to} className={className} onClick={onClick}>
        {link.label}
      </Link>
    ) : (
      <a key={link.label} href={link.href} className={className} onClick={onClick}>
        {link.label}
      </a>
    );

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-neutral-950">
      {/* Background image + scrim: the scrim keeps the white copy legible
          whatever the photo behind it is doing. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
      />

      <a
        href="#contenido"
        className={`sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 ${focusRingDark}`}
        style={inter}
      >
        Saltar al contenido
      </a>

      {/* Navbar */}
      <header className="animate-fade-in relative z-20">
        <nav
          aria-label="Principal"
          className="flex items-center justify-between px-5 sm:px-8 lg:px-10 py-4 lg:py-5"
        >
          <Link
            to="/"
            className={`animate-slide-left delay-200 text-white text-[26px] sm:text-[30px] ${focusRing}`}
            style={{ ...dmSans, fontWeight: 500, letterSpacing: "-0.05em" }}
          >
            AutosEnfasis-I
          </Link>

          <div
            className="animate-fade-in delay-400 hidden lg:flex items-center gap-10 text-white/90 text-lg"
            style={{ ...dmSans, fontWeight: 500 }}
          >
            {NAV_LINKS.map((link) =>
              renderNavLink(link, `hover:text-white transition-colors ${focusRing}`)
            )}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className={`lg:hidden text-white p-2 -mr-2 ${focusRing}`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center gap-8"
        >
          <button
            type="button"
            aria-label="Cerrar menú"
            className={`absolute top-4 right-5 text-white p-2 ${focusRing}`}
            onClick={closeMenu}
          >
            <X size={28} />
          </button>
          <nav
            aria-label="Menú móvil"
            className="flex flex-col items-center gap-8"
            style={dmSans}
          >
            {NAV_LINKS.map((link) =>
              renderNavLink(link, `text-2xl text-white ${focusRing}`, closeMenu)
            )}
          </nav>
        </div>
      )}

      {/* Hero content */}
      <main id="contenido" className="flex-1 flex flex-col relative z-20">
        <section className="flex-1 flex flex-col justify-center px-5 sm:px-8 lg:px-10 py-10">
          <h1
            className="text-[clamp(2.75rem,10vw,9.5rem)] leading-[0.92]"
            style={{ ...dmSans, fontWeight: 400, letterSpacing: "-0.05em" }}
          >
            <span className="block">
              <Word delay="delay-300">Adquiere</Word>{" "}
              <Word delay="delay-400">tu</Word>{" "}
              <Word delay="delay-500" dim>
                vehículo
              </Word>
            </span>
            <span className="block">
              <Word delay="delay-600" dim>
                de
              </Word>{" "}
              <Word delay="delay-800">confianza</Word>
            </span>
          </h1>

          <p
            className="animate-fade-up delay-600 mt-6 max-w-[46ch] text-white/70 text-base sm:text-lg lg:text-xl"
            style={{ ...inter, lineHeight: 1.5, letterSpacing: "-0.01em" }}
          >
            Vehículos certificados, con historial verificado y garantía incluida.
            Encuentra el que se ajusta a tu presupuesto.
          </p>

          <div className="animate-fade-up delay-800 mt-10 lg:mt-14 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <Link
              to="/vehicles"
              className={`bg-white text-black hover:bg-white/90 transition-colors rounded-md w-full sm:w-auto sm:min-w-[260px] px-8 h-14 lg:h-16 flex items-center justify-center gap-2 text-lg lg:text-xl ${focusRing}`}
              style={{ ...inter, fontWeight: 500, letterSpacing: "-0.03em" }}
            >
              Ver vehículos
              <ArrowUpRight size={22} aria-hidden="true" />
            </Link>
            <Link
              to="/login"
              className={`border border-white/30 text-white hover:bg-white/10 transition-colors rounded-md w-full sm:w-auto sm:min-w-[200px] px-8 h-14 lg:h-16 flex items-center justify-center text-lg lg:text-xl ${focusRing}`}
              style={{ ...inter, fontWeight: 500, letterSpacing: "-0.03em" }}
            >
              Crear cuenta
            </Link>
          </div>
        </section>

        {/* Mobile/tablet product image */}
        <div className="lg:hidden relative z-10 px-5 -mb-8">
          <img
            src={PRODUCT_IMAGE}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="animate-scale-in delay-800 w-full max-w-[560px] object-contain mx-auto drop-shadow-2xl"
          />
        </div>

        {/* Bottom 3-panel grid */}
        <section
          id="beneficios"
          aria-label="Beneficios"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1.2fr_2fr] relative z-10"
        >
          {/* Panel 1 — call to action */}
          <article className="animate-fade-up delay-900 bg-[#ECEDEC] text-black relative overflow-hidden p-8 sm:p-10 lg:p-12 min-h-[280px] flex flex-col justify-between">
            <img
              src={PANEL1_DECORATION}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute right-0 inset-y-0 w-1/2 object-cover opacity-25 pointer-events-none [mask-image:linear-gradient(to_right,transparent,black_60%)]"
            />
            <p
              className="relative max-w-[22ch] text-2xl sm:text-[28px] lg:text-[35px] leading-[1.1]"
              style={{ ...dmSans, fontWeight: 400, letterSpacing: "-0.05em" }}
            >
              ¡Realiza el proceso de contratación hoy!
            </p>
            <Link
              to="/vehicles"
              className={`relative inline-flex items-center gap-1 underline underline-offset-4 text-base lg:text-lg mt-6 w-fit hover:text-black/70 transition-colors ${focusRingDark}`}
              style={{ ...inter, letterSpacing: "-0.03em" }}
            >
              Cotiza tu vehículo
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </article>

          {/* Panel 2 — benefits carousel */}
          <article
            className="animate-fade-up delay-1000 bg-[#FEFDF9] text-black p-8 sm:p-10 lg:p-12 min-h-[280px] flex flex-col justify-between"
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
            onFocus={() => setCarouselPaused(true)}
            onBlur={() => setCarouselPaused(false)}
          >
            <div className="relative flex-1" aria-live="polite">
              {CAROUSEL_CARDS.map((card, i) => {
                const Icon = card.icon;
                const isActive = i === activeCard;
                return (
                  <div
                    key={card.text}
                    aria-hidden={!isActive}
                    className={`flex items-center gap-4 transition-all duration-700 ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                    }`}
                  >
                    <div
                      className={`shrink-0 rounded-full ${card.bg} text-white flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12`}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <p
                      className="text-black/80 text-sm sm:text-base lg:text-lg"
                      style={{ ...inter, lineHeight: 1.35, letterSpacing: "-0.02em" }}
                    >
                      {card.text}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 mt-6">
              {CAROUSEL_CARDS.map((card, i) => (
                <button
                  key={card.text}
                  type="button"
                  aria-label={`Ver beneficio ${i + 1} de ${CAROUSEL_CARDS.length}`}
                  aria-current={i === activeCard}
                  onClick={() => setActiveCard(i)}
                  className={`h-6 flex-1 flex items-center ${focusRingDark}`}
                >
                  <span
                    className={`h-0.5 w-full rounded-full transition-colors duration-500 ${
                      i === activeCard ? "bg-black" : "bg-black/20"
                    }`}
                  />
                </button>
              ))}
            </div>
          </article>

          {/* Panel 3 — social proof */}
          <article className="animate-fade-up delay-1100 bg-black p-8 sm:p-10 lg:p-12 min-h-[280px] flex items-center gap-6 md:col-span-2 lg:col-span-1">
            <img
              src={PRODUCT_IMAGE}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="w-[120px] sm:w-[160px] lg:w-[208px] object-contain shrink-0"
            />
            <div>
              <p
                className="text-white text-3xl sm:text-4xl lg:text-[44px]"
                style={{ ...inter, fontWeight: 500, letterSpacing: "-0.05em" }}
              >
                +1000
              </p>
              <p
                className="text-white/70 text-sm sm:text-base lg:text-lg mt-1"
                style={{ ...inter, lineHeight: 1.35 }}
              >
                Clientes que ya conducen su vehículo con nosotros
              </p>
            </div>
          </article>
        </section>
      </main>

      {/* Desktop floating product image */}
      <img
        src={PRODUCT_IMAGE}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="animate-scale-in delay-700 hidden lg:block absolute z-0 pointer-events-none select-none drop-shadow-2xl"
        style={{
          width: "clamp(600px, 62vw, 1100px)",
          height: "auto",
          bottom: "12%",
          right: "clamp(-260px, -10vw, -80px)",
        }}
      />
    </div>
  );
};

export { Home };
