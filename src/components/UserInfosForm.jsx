import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

import { changeProfile } from "../services/accountManagement";

const UserInfosForm = (props) => {
  const { user } = useSelector(selectUser);
  const [userInfo, setUserInfo] = useState(user);

  //   { name: " ", firstname: " ", telephone: ""}

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor="gender">civilite</label>
      <select name="gender-select" id="" value={userInfo.gender}>
        <option value="male">Homme</option>
        <option value="female">Femme</option>
        <option value="Other">Autre</option>
      </select>
      <label htmlFor="service">categorie</label>
      <select name="service-select" id="" value={userInfo.gender}>
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
        }}
      />
      <label htmlFor="lastname">Nom</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        value={userInfo.lastname}
      />
      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email" value={userInfo.email} />
      <label htmlFor="phone">Téléphone</label>
      <input type="text" name="phone" id="phone" value={userInfo.phone} />
      <label htmlFor="password">Mot de passe</label>
      <input
        type="text"
        name="password"
        id="password"
        placeholder="Changer le mot de passe"
      />
      <label htmlFor="confirm-password">Confirmer le mot de passe</label>
      <input type="text" name="password" id="password" />
      <label htmlFor="birthdate">Date de naissance</label>
      <input
        type="date"
        name="birthdate"
        id="birthdate"
        value={userInfo.birthdate}
      />
      <label htmlFor="city">Ville</label>
      <input type="text" name="address" id="" value={userInfo.city} />
      <label htmlFor="country">Pays</label>
      <input type="text" name="country" id="country" value={userInfo.country} />
      <label htmlFor="photo">URL de la photo</label>
      <input type="text" name="photo" id="photo" value={userInfo.photo} />
      <button type="submit">Modifier</button>
    </form>
  );
};

export default UserInfosForm;
