import React from "react";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Salut</h1>
      <button
        onClick={() => {
          navigate("/register");
        }}
      >
        Creer un compte
      </button>
    </div>
  );
};

export default Register;
