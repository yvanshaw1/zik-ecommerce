import { CartProvider } from "./contexts/CartProvider";
import { AppRoutes } from "./routes";
import { Popup } from "./components/Popup";
import "./styles/global.css";

function App() {
  return (
    <CartProvider>
      <Popup />
      <AppRoutes />
    </CartProvider>
  );
}

export default App;
