import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Category } from "../pages/Category";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/categoria/notebooks"
          element={<Category categoryId="notebooks" />}
        />
        <Route
          path="/categoria/computadores-gamer"
          element={<Category categoryId="computadores-gamer" />}
        />
        <Route
          path="/categoria/perifericos"
          element={<Category categoryId="perifericos" />}
        />
        <Route
          path="/categoria/hardware"
          element={<Category categoryId="hardware" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
