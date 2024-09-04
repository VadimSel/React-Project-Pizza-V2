import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import FullPizza from "./pages/FullPizza";

import "./scss/app.scss";
import { createContext, useState } from "react";
import MainLayout from "./layouts/MainLayout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/pizza/:id" element={<FullPizza />} />
                <Route path="/react-pizza-v2" element={<Navigate to={"/"} />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
