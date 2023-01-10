import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import getRandomCollaborator, {
  getAllCollaborators,
} from "../services/collaboratorsManagement";

const SearchCollaborator = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("anything");
  const [searchByType, setSearchByType] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (text) => {
    setSearchTerm(text);
    console.log(searchTerm);
    let results = [];
    switch (searchByType) {
      case "name":
        results = users.filter(
          (user) =>
            user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case "city":
        results = users.filter((user) =>
          user.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      default:
        results = users.filter(
          (user) =>
            user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
    }
    if (category !== "anything") {
      results = results.filter((user) => user.service === category);
    }
    setSearchResults(results);
    console.log("results : ", results);
  };

  useEffect(() => {
    getAllCollaborators()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <header>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Intranet
        </button>
      </header>
      <h1>Chercher un collaborateur</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm === "" ? "" : searchTerm}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <select
        name="type-selector"
        onChange={(e) => {
          setSearchByType(e.target.value);
        }}
        defaultValue="test"
      >
        <option value="anything">Tout</option>
        <option value="name">Nom</option>
        <option value="city">Ville</option>
      </select>
      <select
        name="job-selector"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="anything">Aucun</option>
        <option value="Marketing">Marketing</option>
        <option value="Client">Client</option>
        <option value="Technique">Technique</option>
      </select>
      {users &&
        searchResults.map((user) => {
          return (
            <div key={user.id}>
              <h2>
                {user.firstname} {user.lastname}
              </h2>
              <h2>{user.city}</h2>
              <h3>{user.service}</h3>
              <h3>{user.birthdate}</h3>
              <h3>{user.email}</h3>
              <h3>{user.phone}</h3>
              <img src={user.photo} alt="" />
            </div>
          );
        })}
    </div>
  );
};

export default SearchCollaborator;
