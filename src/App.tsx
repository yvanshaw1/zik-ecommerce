import { CartProvider } from "./contexts/CartProvider";
import { AppRoutes } from "./routes";
import "./styles/global.css";

function App() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}

export default App;
