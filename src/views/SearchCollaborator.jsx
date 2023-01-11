import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import getRandomCollaborator, {
  getAllCollaborators,
  deleteCollaborator,
} from "../services/collaboratorsManagement";

import ProfileCard from "../components/ProfileCard";

const SearchCollaborator = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("anything");
  const [searchByType, setSearchByType] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [reload, setReload] = useState(false);

  const handleChange = (text) => {
    setSearchTerm(text);
    // console.log(searchTerm);
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
    // console.log("results : ", results);
  };

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/login");
    }
    getAllCollaborators()
      .then((res) => {
        setUsers(res.data);
        setSearchResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

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
      <div className="search flex justify-flex-start">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm === "" ? "" : searchTerm}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

      <select
        name="type-selector"
        onChange={(e) => {
          setSearchByType(e.target.value);
          setSearchTerm("");
          setReload(!reload);
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
          setSearchTerm("");
          setReload(!reload);
        }}
      >
        <option value="anything">Aucun</option>
        <option value="Marketing">Marketing</option>
        <option value="Client">Client</option>
        <option value="Technique">Technique</option>
      </select>
      </div>
      {users &&
        searchResults.map((user) => {
          return (
            <ProfileCard
              key={user.id}
              randomUser={user}
              deleteUser={() => {
                deleteCollaborator(user.id)
                  .then((res) => {
                    // console.log(res);
                    setReload(!reload);
                  })
                  .catch((err) => {
                    console.log(error);
                  });
              }}
            />
          );
        })}
    </div>
  );
};

export default SearchCollaborator;
