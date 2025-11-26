// src/App.tsx
import { BrowserRouter, useLocation } from "react-router-dom";
import { CartProvider } from "./contexts/CartProvider";
import { AppRoutes } from "./routes";
import { Popup } from "./components/Popup";
import "./styles/global.css";
import { AuthProvider } from "./contexts/AuthProvider";
import { Header } from "./components/Header";
import { ScrollToTop } from "./components/ScrollToTop";

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
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
