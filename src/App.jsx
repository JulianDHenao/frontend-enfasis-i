import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { Login, Profile } from "./pages";
import { Home } from "./pages";
import { Vehicles } from "./pages/Vehicles";
import { Header } from "./components";
import { ProductDetails } from "./pages/ProductDetail";

const WithHeader = () => (
  <>
    <Header />
    <Outlet />
  </>
);

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<WithHeader />}>
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/details/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
