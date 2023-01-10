import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

const Header = () => {
  const { user } = useSelector(selectUser);
  const navigate = useNavigate();
  return (
    <header>
      {user ? (
        <>
          <img src={user.photo} alt="user-image" />
          <button
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              navigate("/login");
              window.location.reload();
            }}
          >
            Disconnect
          </button>
          <button
            onClick={() => {
              navigate("/search");
            }}
          >
            Chercher un collaborateur
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      )}
    </header>
  );
};

export default Header;
