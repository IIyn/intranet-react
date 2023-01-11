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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div class="flex flex-col  flex-wrap items-center bg-rose border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-rose-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-10">
        <img 
        style={{width: "14rem"}}
          class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={randomUser.photo}
          alt="user image"
        />
        <div
          key={randomUser.id}
          class="flex flex-col justify-between p-4 leading-normal"
        >
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
</svg>

                
              </button>
              <button 
                onClick={() => {
                  setShowProfilePopUp({
                    show: true,
                    type: "Editer",
                  });
                }}
              >
                
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />

</svg> 


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
    </div>
  );
};

export default ProfileCard;
