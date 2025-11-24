import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Categoria } from "../pages/Category";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/categoria/notebooks"
          element={<Categoria categoriaId="notebooks" />}
        />
        <Route
          path="/categoria/computadores-gamer"
          element={<Categoria categoriaId="computadores-gamer" />}
        />
        <Route
          path="/categoria/perifericos"
          element={<Categoria categoriaId="perifericos" />}
        />
        <Route
          path="/categoria/hardware"
          element={<Categoria categoriaId="hardware" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
