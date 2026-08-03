import React, { useState, useEffect } from "react";
import { onSignup, onLogin, onViewProfile } from "../store/actions";
import { Profile } from "./Profile";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const dmSans = { fontFamily: "'DM Sans', sans-serif" };
const inter = { fontFamily: "'Inter', sans-serif" };

const inputClass =
  "w-full border border-black/15 rounded-md px-3 py-2 focus:outline-none focus:border-black";

const Login = () => {
  const { user } = useAppSelector((state) => state.userReducer);

  const dispatch = useAppDispatch();

  const { token } = user;

  const [isSignup, setSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(onViewProfile());
    }
  }, [token]);

  const userSignup = () => {
    dispatch(
      onSignup({
        email: signupEmail,
        password: signupPassword,
        phone: signupPhone,
      })
    );
  };

  const userLogin = () => {
    dispatch(onLogin({ email, password }));
  };

  const loginForm = () => (
    <div className="w-full max-w-sm bg-white p-6 rounded-lg">
      <h1 className="text-2xl mb-6" style={dmSans}>
        Iniciar sesión
      </h1>
      <div className="flex flex-col gap-4" style={inter}>
        <div>
          <label className="block text-sm mb-1">Correo electrónico</label>
          <input
            className={inputClass}
            type="email"
            placeholder="tu@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            className={inputClass}
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex gap-3 mt-2">
          <button
            className="flex-1 py-2 rounded-md bg-black text-white"
            onClick={userLogin}
            type="button"
          >
            Login
          </button>
          <button
            className="flex-1 py-2 rounded-md border border-black/20"
            onClick={() => setSignup(true)}
            type="button"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );

  const signUpForm = () => (
    <div className="w-full max-w-sm bg-white p-6 rounded-lg">
      <h1 className="text-2xl mb-6" style={dmSans}>
        Crear cuenta
      </h1>
      <div className="flex flex-col gap-4" style={inter}>
        <div>
          <label className="block text-sm mb-1">Correo electrónico</label>
          <input
            className={inputClass}
            type="email"
            placeholder="tu@email.com"
            onChange={(e) => setSignupEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            className={inputClass}
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setSignupPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Teléfono</label>
          <input
            className={inputClass}
            type="tel"
            placeholder="Teléfono"
            onChange={(e) => setSignupPhone(e.target.value)}
          />
        </div>
        <div className="flex gap-3 mt-2">
          <button
            className="flex-1 py-2 rounded-md bg-black text-white"
            onClick={userSignup}
            type="button"
          >
            Signup
          </button>
          <button
            className="flex-1 py-2 rounded-md border border-black/20"
            onClick={() => setSignup(false)}
            type="button"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );

  if (token) {
    return <Profile />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex items-center justify-center p-5">
      {isSignup ? signUpForm() : loginForm()}
    </div>
  );
};

export { Login };
