import { CartProvider } from "./contexts/CartProvider";
import { AppRoutes } from "./routes";
import { Toaster } from "sonner";
import "./styles/global.css";

function App() {
  return (
    <CartProvider>
      <Toaster position="top-right" richColors />
      <AppRoutes />
    </CartProvider>
  );
}

export default App;
