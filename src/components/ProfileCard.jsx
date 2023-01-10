import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
const ProfileCard = (props) => {
  const { user } = useSelector(selectUser);
  const randomUser = props.randomUser;
  return (
    <div key={randomUser.id}>
      <h1>
        {randomUser.firstname} {randomUser.lastname}
      </h1>
      <h2>{randomUser.birthdate}</h2>
      <h2>
        {randomUser.city} {randomUser.country}
      </h2>
      <h2>{randomUser.email}</h2>
      <h2>{randomUser.phone}</h2>
      <img src={randomUser.photo} alt="user image" />
      {user.isAdmin && (
        <button
          onClick={() => {
            props.deleteUser(randomUser.id);
          }}
        >
          Supprimer le compte
        </button>
      )}
    </div>
  );
};

export default ProfileCard;
