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
    <header className="flex justify-between w-full h-12 bg-gradient-to-b from-red-400 via-red-500 to-pink-500">
      <div className="ml-10 mt-3 transition ease-in-out delay-300 hover:scale-150 duration-300">
        <button
          className="p-1 pl-7"
          onClick={() => {
            navigate("/");
          }}
        >
          Intranet
        </button>
      </div>
      {user ? (
        <>
          <div className="ml-10 mt-3 transition ease-in-out delay-300 hover:scale-150 duration-300">
            <button
              className="font-bold"
              onClick={() => {
                navigate("/search");
              }}
            >
              Chercher un collaborateur
            </button>
          </div>
          {user.isAdmin && (
            <div className="ml-10 mt-3 transition ease-in-out delay-300 hover:scale-150 duration-300">
              <button
                className="font-bold"
                onClick={() => {
                  setShowProfilePopUp({
                    show: true,
                    type: "Ajouter un profil",
                  });
                }}
              >
                Ajouter un profil
              </button>
            </div>
          )}
          <div className="flex flex-nowrap">
            <img
              className="mr-5 w-12 h-12 rounded-full bg-cover cursor-pointer"
              src={user.photo}
              alt="user-image"
              onClick={() => {
                setShowProfilePopUp({
                  show: true,
                  type: "Modifier mon profil",
                });
              }}
            />
            <div className="p-1 px-7 bg-slate-200 text-red-500 hover:bg-rose-300 hover:text-white">
              <button
                className="mt-1 font-bold text-2xl"
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  navigate("/login");
                  window.location.reload();
                }}
              >
                Déconnexion
              </button>
            </div>
          </div>
          {showProfilePopUp.show && (
            <ProfilePopUp
              setShowProfilePopUp={setShowProfilePopUp}
              type={showProfilePopUp.type}
            />
          )}
        </>
      ) : (
        <div className="p-1 px-7 bg-slate-200 text-red-500 hover:bg-rose-300 hover:text-white">
          <button
            className="mt-1 font-bold text-2xl"
            onClick={() => {
              navigate("/login");
            }}
          >
            Connexion
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
