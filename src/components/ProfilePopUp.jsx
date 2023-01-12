import React, { useState } from "react";
import UserInfosForm from "./UserInfosForm";

const ProfilePopUp = (props) => {
  return (
    <div className="absolute w-2/12 top-1/2 left-1/2 text-black rounded-lg bg-slate-200 w-72 -translate-y-1/2 -translate-x-1/2">
      <div className="flex flex-row-reverse p-3">
        <button
          className=" w-8 h-8 font-bold rounded-full bg-rose-600"
          onClick={() => {
            props.setShowProfilePopUp(false);
          }}
        >
          X
        </button>
      </div>

      <h1 className="flex justify-center p-1 text-3   xl mb-5 font-bold text-3xl">
        {props.type}
      </h1>
      <UserInfosForm type={props.type} userToEdit={props.userToEdit} />
    </div>
  );
};

export default ProfilePopUp;
