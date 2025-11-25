import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Category } from "../pages/Category";
import { Product } from "../pages/Product";
import { Cart } from "../pages/Cart";
import { Auth } from "../pages/Auth/Login";
import { Account } from "../pages/Account";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}
