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
import { PaymentProvider } from "./contexts/PaymentProvider";

function AppContent() {
  const location = useLocation();
  const isAuthRoute = location.pathname === "/auth";

  return (
    <>
      {/* Esconde o Header na página de auth (tela cheia de login/signup). */}
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
      {/* Ordem dos providers define o "ambiente" global da aplicação. */}
      <ProductsProvider>
        <AuthProvider>
          <PaymentProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </PaymentProvider>
        </AuthProvider>
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;
