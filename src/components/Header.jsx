import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

import ProfilePopUp from "./ProfilePopUp";

const Header = () => {
  const { user } = useSelector(selectUser);
  const [showProfilePopUp, setShowProfilePopUp] = useState(false);
  const navigate = useNavigate();
  return (
    <header>
      {user ? (
        <>
          <button
            onClick={() => {
              navigate("/search");
            }}
          >
            Chercher un collaborateur
          </button>
          <img
            src={user.photo}
            alt="user-image"
            onClick={() => {
              setShowProfilePopUp(true);
            }}
          />
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
          {showProfilePopUp && (
            <ProfilePopUp
              setShowProfilePopUp={setShowProfilePopUp}
              type="Modifier mon profil"
            />
          )}
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
