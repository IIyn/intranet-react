import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import getRandomCollaborator, {
  deleteCollaborator,
} from "../services/collaboratorsManagement";

import ProfileCard from "../components/ProfileCard";

const Register = () => {
  const navigate = useNavigate();

  const [randomUser, setRandomUser] = useState(null);
  const [reload, setReload] = useState(false);
  const { user } = useSelector(selectUser);

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/login");
    }
    getRandomCollaborator()
      .then((res) => {
        console.log("RESPONSE OK ", res.data);
        setRandomUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

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
        <ProfileCard 
          randomUser={randomUser}
          deleteUser={() => {
            deleteCollaborator(randomUser.id)
              .then((res) => {
                // console.log(res);
                setReload(!reload);
                se;
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        />
      )}
    </div>
  );
};

export default Register;
