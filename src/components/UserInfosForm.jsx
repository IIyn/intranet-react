import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

import { changeProfile } from "../services/accountManagement";
import {
  addCollaborator,
  getCollaboratorByID,
} from "../services/collaboratorsManagement";

const UserInfosForm = (props) => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] =
    props.type === "Modifier mon profil"
      ? useState(user)
      : props.type === "Editer"
      ? useState(props.userToEdit)
      : useState({
          gender: "",
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          phone: "",
          birthdate: "",
          city: "",
          country: "",
          photo: "",
          service: "",
          isAdmin: false,
        });

  const [passwordCheckText, setPasswordCheckText] = useState("");
  const handleSubmit = () => {
    console.log(props.type);
    if (props.type === "Modifier Mon Profil" || props.type === "Editer") {
      console.log("change profile");
      const dataToSend =
        userInfo.password === ""
          ? {
              gender: userInfo.gender,
              firstname: userInfo.firstname,
              lastname: userInfo.lastname,
              email: userInfo.email,
              phone: userInfo.phone,
              birthdate: userInfo.birthdate,
              city: userInfo.city,
              country: userInfo.country,
              photo: userInfo.photo,
              service: userInfo.service,
              isAdmin: userInfo.isAdmin,
            }
          : {
              gender: userInfo.gender,
              firstname: userInfo.firstname,
              lastname: userInfo.lastname,
              email: userInfo.email,
              password: userInfo.password,
              phone: userInfo.phone,
              birthdate: userInfo.birthdate,
              city: userInfo.city,
              country: userInfo.country,
              photo: userInfo.photo,
              service: userInfo.service,
              isAdmin: userInfo.isAdmin,
            };
      console.log(userInfo);
      changeProfile(dataToSend, userInfo.id)
        .then((res) => {
          console.log(res);
          if (props.type === "Modifier Mon Profil") {
            localStorage.setItem(
              "user",
              JSON.stringify(res.data.collaborateur)
            );
            dispatch(
              setUser({
                ...res.data.collaborateur,
                isAdmin: user.isAdmin,
              })
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("add collaborator");
      const dataToSend = {
        gender: userInfo.gender,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        password: userInfo.password,
        email: userInfo.email,
        phone: userInfo.phone,
        birthdate: userInfo.birthdate,
        city: userInfo.city,
        country: userInfo.country,
        photo: userInfo.photo,
        service: userInfo.service,
        isAdmin: userInfo.isAdmin,
      };
      addCollaborator(dataToSend)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label htmlFor="gender">civilite</label>
      <select
        name="gender-select"
        id=""
        value={userInfo.gender}
        onChange={(e) => {
          setUserInfo({ ...userInfo, gender: e.target.value });
          console.log(e.target.value);
        }}
      >
        <option value="male">Homme</option>
        <option value="female">Femme</option>
        <option value="other">Autre</option>
      </select>
      <label htmlFor="service">categorie</label>
      <select
        name="service-select"
        id=""
        value={userInfo.service}
        onChange={(e) => {
          setUserInfo({ ...userInfo, service: e.target.value });
          console.log(e.target.value);
        }}
      >
        <option value="Technique">Technique</option>
        <option value="Marketing">Marketing</option>
        <option value="Client">Client</option>
      </select>
      <label htmlFor="firstname">Prénom</label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        value={userInfo.firstname}
        onChange={(e) => {
          setUserInfo({ ...userInfo, firstname: e.target.value });
          console.log(e.target.value);
        }}
      />
      <label htmlFor="lastname">Nom</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        value={userInfo.lastname}
        onChange={(e) => {
          setUserInfo({ ...userInfo, lastname: e.target.value });
          console.log(e.target.value);
        }}
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        value={userInfo.email}
        onChange={(e) => {
          setUserInfo({ ...userInfo, email: e.target.value });
          console.log(e.target.value);
        }}
      />
      <label htmlFor="phone">Téléphone</label>
      <input
        type="text"
        name="phone"
        id="phone"
        value={userInfo.phone}
        onChange={(e) => {
          setUserInfo({ ...userInfo, phone: e.target.value });
          console.log(e.target.value);
        }}
      />
      <label htmlFor="password">Mot de passe</label>
      <p
        style={{
          color: "red",
        }}
      >
        {passwordCheckText}
      </p>
      <input
        type="text"
        name="password"
        id="password"
        placeholder="Changer le mot de passe"
        onChange={(e) => {
          setUserInfo({ ...userInfo, tempPassword: e.target.value });
          console.log(e.target.value);
          if (e.target.value === userInfo.password) {
            setPasswordCheckText("");
          } else {
            setPasswordCheckText("Les mots de passe doivent correspondre");
          }
        }}
      />
      <label htmlFor="confirm-password">Confirmer le mot de passe</label>
      <input
        type="text"
        name="password"
        id="password"
        onChange={(e) => {
          setUserInfo({ ...userInfo, password: e.target.value });
          if (e.target.value === userInfo.tempPassword) {
            console.log(e.target.value);
            setPasswordCheckText("");
          } else {
            setPasswordCheckText("Les mots de passe doivent correspondre");
          }
        }}
      />
      <p
        style={{
          color: "red",
        }}
      >
        {passwordCheckText}
      </p>
      <label htmlFor="birthdate">Date de naissance</label>
      <input
        type="date"
        name="birthdate"
        id="birthdate"
        value={userInfo.birthdate}
        onChange={(e) => {
          setUserInfo({ ...userInfo, birthdate: e.target.value });
          console.log(e.target.value);
        }}
      />
      <label htmlFor="city">Ville</label>
      <input
        type="text"
        name="address"
        id=""
        value={userInfo.city}
        onChange={(e) => {
          setUserInfo({ ...userInfo, city: e.target.value });
          console.log(e.target.value);
        }}
      />
      <label htmlFor="country">Pays</label>
      <input
        type="text"
        name="country"
        id="country"
        value={userInfo.country}
        onChange={(e) => {
          setUserInfo({ ...userInfo, country: e.target.value });
          console.log(e.target.value);
        }}
      />
      <label htmlFor="photo">URL de la photo</label>
      <input
        type="text"
        name="photo"
        id="photo"
        value={userInfo.photo}
        onChange={(e) => {
          setUserInfo({ ...userInfo, photo: e.target.value });
          console.log(e.target.value);
        }}
      />
      {user.isAdmin && (
        <>
          <label htmlFor="isAdmin">Admin</label>
          <input
            type="checkbox"
            name="isAdmin"
            id="isAdmin"
            checked={userInfo.isAdmin}
            onChange={(e) => {
              setUserInfo({ ...userInfo, isAdmin: e.target.checked });
              console.log(e.target.checked);
            }}
          />
        </>
      )}
      <button type="submit">{props.type}</button>
    </form>
  );
};

export default UserInfosForm;
