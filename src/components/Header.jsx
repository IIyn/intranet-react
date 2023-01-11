import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../slices/userSlice";

import ProfilePopUp from "./ProfilePopUp";

const Header = () => {
    const {user} = useSelector(selectUser);
    const [showProfilePopUp, setShowProfilePopUp] = useState({
        show: false,
        type: "",
    });
    const navigate = useNavigate();
    return (
        <header className="flex justify-between w-full h-12 bg-gradient-to-b from-red-400 via-red-500 to-pink-500">
            <div className="p-1 pl-7">
                <p className="font-bold text-3xl">Intranet</p>
            </div>
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
                    <img className=" w-12 h-12 rounded-full bg-cover"
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
                        <button className="mt-1 font-bold text-2xl"
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
                    {showProfilePopUp.show && (
                        <ProfilePopUp
                            setShowProfilePopUp={setShowProfilePopUp}
                            type={showProfilePopUp.type}
                        />
                    )}
                </>
            ) : (
                <div className="p-1 px-7 bg-slate-200 text-red-500 hover:bg-rose-300 hover:text-white">
                    <button className="mt-1 font-bold text-2xl"
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
