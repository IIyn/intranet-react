import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

import ProfilePopUp from "./ProfilePopUp";

const Header = () => {
  const { user } = useSelector(selectUser);
  const [showProfilePopUp, setShowProfilePopUp] = useState({
    show: false,
    type: "",
  });
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
          {user.isAdmin && (
            <button
              onClick={() => {
                setShowProfilePopUp({
                  show: true,
                  type: "Ajouter un profil",
                });
              }}
            >
              Ajouter un profil
            </button>
          )}
          <img
            src={user.photo}
            alt="user-image"
            onClick={() => {
              setShowProfilePopUp({
                show: true,
                type: "Modifier mon profil",
              });
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
          {showProfilePopUp.show && (
            <ProfilePopUp
              setShowProfilePopUp={setShowProfilePopUp}
              type={showProfilePopUp.type}
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