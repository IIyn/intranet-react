import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import getRandomCollaborator, {
  getAllCollaborators,
} from "../services/collaboratorsManagement";

const SearchCollaborator = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);

    const results = users.filter((user) =>
      user.firstname.toLowerCase().includes(searchTerm)
    );
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
      <h1>Chercher un collaborateur</h1>
      <input type="text" placeholder="Search" onChange={handleChange} />
      {users &&
        searchResults.map((user, id) => {
          return (
            <div key={id}>
              <h2>{user.firstname}</h2>
              {/* <h3>{user.birthdate}</h3>
              <h3>{user.email}</h3>
              <h3>{user.phone}</h3>
              <img src={user.photo} alt="" /> */}
            </div>
          );
        })}
    </div>
  );
};

export default SearchCollaborator;
