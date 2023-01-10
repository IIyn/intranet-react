import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import getRandomCollaborator from "../services/collaboratorsManagement";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [randomUser, setRandomUser] = useState(null);

  const { user } = useSelector(selectUser);

  return (
    <div className="home">
      {user && (
        <button
          onClick={() => {
            getRandomCollaborator()
              .then((res) => {
                console.log("RESPONSE OK ", res.data);
                setRandomUser(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          random user
        </button>
      )}

      {randomUser && (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default Register;
