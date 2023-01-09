import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

const Register = () => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  return (
    <div className="home">
      <h1>Salut</h1>
      <h2>{user.user.name}</h2>
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
