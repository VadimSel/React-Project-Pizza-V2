import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import { Header } from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";
import { createContext, useState } from "react";

function App() {

    return (
        <div className="wrapper">
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/react-pizza-v2" element={<Navigate to={"/"} />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
        </div>
    );
}

export default App;
