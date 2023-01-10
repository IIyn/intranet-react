import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./App.css";

import Login from "./views/Login";
import Home from "./views/Home";
import SearchCollaborator from "./views/SearchCollaborator";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchCollaborator />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
