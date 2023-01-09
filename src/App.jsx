import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./App.css";

import Register from "./views/Register";
import Home from "./views/Home";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
