import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

import ProfilePopUp from "./ProfilePopUp";
const ProfileCard = (props) => {
  const { user } = useSelector(selectUser);
  const randomUser = props.randomUser;

  const [showProfilePopUp, setShowProfilePopUp] = useState({
    show: false,
    type: "",
  });
  return (
<div className="bg-white rounded-lg shadow-md pt-70 mb-30 mt-10 grid grid-cols-2 gap-1" >
      <img class="flex items-center ..."src={randomUser.photo} alt="user image" />

    <div key={randomUser.id}  >
      <h1>
        {randomUser.firstname} {randomUser.lastname}
      </h1>
      <h2>{randomUser.service}</h2>
      <h2>{randomUser.birthdate}</h2>
      <h2>
        {randomUser.city} {randomUser.country}
      </h2>
      <h2>{randomUser.email}</h2>
      <h2>{randomUser.phone}</h2>
      {user.isAdmin && (
        <>
          <button
            onClick={() => {
              props.deleteUser(randomUser.id);
            }}
            >
            Supprimer le compte
          </button>
          <button
            onClick={() => {
              setShowProfilePopUp({
                show: true,
                type: "Editer",
              });
            }}
            >
            Editer
          </button>
          {showProfilePopUp.show && (
            <ProfilePopUp
            setShowProfilePopUp={setShowProfilePopUp}
            type={showProfilePopUp.type}
            userToEdit={randomUser}
            />
            )}
        </>
      )}
      </div>
    </div>
  );
};

export default ProfileCard;
