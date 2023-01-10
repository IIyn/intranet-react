import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import UserInfosForm from "./UserInfosForm";

const ProfilePopUp = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <button
        onClick={() => {
          props.setShowProfilePopUp(false);
        }}
      >
        X
      </button>
      <h1>{props.type}</h1>
      <UserInfosForm type={props.type} userToEdit={props.userToEdit} />
    </div>
  );
};

export default ProfilePopUp;
