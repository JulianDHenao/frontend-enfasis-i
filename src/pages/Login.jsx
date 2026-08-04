import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { onSignup, onLogin, onClearAuthError } from "../store/actions";
import { Profile } from "./Profile";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const dmSans = { fontFamily: "'DM Sans', sans-serif" };
const inter = { fontFamily: "'Inter', sans-serif" };

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm";

const inputClass =
  "w-full border border-black/15 rounded-md px-3 py-2.5 bg-white transition-colors focus:outline-none focus:border-black focus:ring-1 focus:ring-black";

const Login = () => {
  const { user, authPending, authError } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();

  const { token } = user;

  const [isSignup, setSignup] = useState(false);

  // A stale error from the other form would be confusing, and so would one that
  // outlives the value the user just corrected.
  const switchMode = (signup) => {
    setSignup(signup);
    if (authError) dispatch(onClearAuthError());
  };

  const clearErrorOnEdit = () => {
    if (authError) dispatch(onClearAuthError());
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");

  const userSignup = (event) => {
    event.preventDefault();
    dispatch(
      onSignup({
        email: signupEmail,
        password: signupPassword,
        phone: signupPhone,
      })
    );
  };

  const userLogin = (event) => {
    event.preventDefault();
    dispatch(onLogin({ email, password }));
  };

  if (token) {
    return <Profile />;
  }

  // role="alert" so screen readers announce it the moment it appears, without
  // the user having to go looking for it.
  const errorBanner = authError && (
    <div
      id="auth-error"
      role="alert"
      className="flex items-start gap-2.5 mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm"
      style={inter}
    >
      <AlertCircle size={18} aria-hidden="true" className="shrink-0 mt-px" />
      <span>{authError}</span>
    </div>
  );

  const submitProps = {
    disabled: authPending,
    className: `w-full py-3 mt-2 rounded-md bg-black text-white hover:bg-black/85 transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${focusRing}`,
    type: "submit",
    style: { fontWeight: 500 },
  };

  // Marks the field as part of the failed attempt, and points assistive tech at
  // the banner that explains why.
  const invalidProps = authError
    ? { "aria-invalid": true, "aria-describedby": "auth-error" }
    : {};

  const loginForm = (
    <form className="flex flex-col gap-4" style={inter} onSubmit={userLogin}>
      <div>
        <label htmlFor="login-email" className="block text-sm mb-1.5 text-black/70">
          Correo electrónico
        </label>
        <input
          id="login-email"
          className={inputClass}
          type="email"
          required
          autoComplete="email"
          placeholder="tu@email.com"
          value={email}
          {...invalidProps}
          onChange={(e) => {
            setEmail(e.target.value);
            clearErrorOnEdit();
          }}
        />
      </div>
      <div>
        <label htmlFor="login-password" className="block text-sm mb-1.5 text-black/70">
          Contraseña
        </label>
        <input
          id="login-password"
          className={inputClass}
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          {...invalidProps}
          onChange={(e) => {
            setPassword(e.target.value);
            clearErrorOnEdit();
          }}
        />
      </div>
      <button {...submitProps}>
        {authPending ? "Iniciando sesión…" : "Iniciar sesión"}
      </button>
    </form>
  );

  const signUpForm = (
    <form className="flex flex-col gap-4" style={inter} onSubmit={userSignup}>
      <div>
        <label htmlFor="signup-email" className="block text-sm mb-1.5 text-black/70">
          Correo electrónico
        </label>
        <input
          id="signup-email"
          className={inputClass}
          type="email"
          required
          autoComplete="email"
          placeholder="tu@email.com"
          value={signupEmail}
          {...invalidProps}
          onChange={(e) => {
            setSignupEmail(e.target.value);
            clearErrorOnEdit();
          }}
        />
      </div>
      <div>
        <label htmlFor="signup-password" className="block text-sm mb-1.5 text-black/70">
          Contraseña
        </label>
        <input
          id="signup-password"
          className={inputClass}
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          placeholder="Mínimo 6 caracteres"
          value={signupPassword}
          onChange={(e) => {
            setSignupPassword(e.target.value);
            clearErrorOnEdit();
          }}
        />
      </div>
      <div>
        <label htmlFor="signup-phone" className="block text-sm mb-1.5 text-black/70">
          Teléfono
        </label>
        <input
          id="signup-phone"
          className={inputClass}
          type="tel"
          required
          autoComplete="tel"
          placeholder="300 000 0000"
          value={signupPhone}
          onChange={(e) => {
            setSignupPhone(e.target.value);
            clearErrorOnEdit();
          }}
        />
      </div>
      <button {...submitProps}>
        {authPending ? "Creando cuenta…" : "Crear cuenta"}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className={`inline-flex items-center gap-1.5 text-sm text-black/60 hover:text-black transition-colors mb-6 ${focusRing}`}
          style={inter}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Volver al inicio
        </Link>

        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm">
          {/* Segmented control: one visible choice between the two forms,
              instead of a button that silently swaps the whole card. */}
          <div
            role="tablist"
            aria-label="Acceso a la cuenta"
            className="flex p-1 bg-black/5 rounded-md mb-6"
            style={inter}
          >
            {[
              { key: "login", label: "Iniciar sesión" },
              { key: "signup", label: "Crear cuenta" },
            ].map(({ key, label }) => {
              const selected = (key === "signup") === isSignup;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="auth-panel"
                  onClick={() => switchMode(key === "signup")}
                  className={`flex-1 py-2 text-sm rounded transition-colors ${focusRing} ${
                    selected
                      ? "bg-white text-black shadow-sm"
                      : "text-black/50 hover:text-black/80"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div id="auth-panel" role="tabpanel">
            <h1 className="text-2xl mb-1" style={dmSans}>
              {isSignup ? "Crea tu cuenta" : "Bienvenido de vuelta"}
            </h1>
            <p className="text-sm text-black/50 mb-6" style={inter}>
              {isSignup
                ? "Regístrate para guardar vehículos y hacer pedidos."
                : "Accede para ver tu carrito, favoritos y pedidos."}
            </p>
            {errorBanner}
            {isSignup ? signUpForm : loginForm}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Login };
