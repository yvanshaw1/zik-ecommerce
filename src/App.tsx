import { CarrinhoProvider } from "./contexts";
import { AppRoutes } from "./routes";

function App() {
  return (
    <CarrinhoProvider>
      <AppRoutes />
    </CarrinhoProvider>
  );
}

export default App;
