// src/App.tsx
import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "./routes";
import "./styles/global.css";
import { Header } from "./components/Header";
import { ScrollToTop } from "./components/ScrollToTop";
import { Popup } from "./components/Popup";
import { AuthProvider } from "./contexts/AuthProvider";
import { CartProvider } from "./contexts/CartProvider";
import { ProductsProvider } from "./contexts/ProductsProvider";

function AppContent() {
  const location = useLocation();
  const isAuthRoute = location.pathname === "/auth";

  return (
    <>
      {!isAuthRoute && <Header />}
      <Popup />
      <AppRoutes />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ProductsProvider>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;
