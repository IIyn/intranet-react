import React, { useState, useEffect } from "react";

import logIn from "../services/accountManagement";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { setUser } from "../slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = () => {
    logIn({ email, password })
      .then((res) => {
        console.log("RESPONSE OK ", res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(setUser(res.data.user));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Erreur de connexion");
      });
  };

  return (
    <div>
        <div>
            <h1 className="p-5 font-bold text-6xl">Connexion</h1>
            <div className="divide-y-4"/>
            <p className="p-3">Pour vous connecter à l'intranet, entrez votre identifiant et mot de passe</p>
        </div>

      <form className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
          <div className="flex flex-col">
              <div className="p-2 flex justify-end">
                  <label className="flex items-center" htmlFor="email">Email :</label>
                  <input className="p-2 ml-2  w-3/4"
                      type="text"
                      name="email"
                      placeholder="ex: owen.lopez@example.com"
                      id="email"
                      onChange={(e) => {
                          setEmail(e.target.value);
                      }}
                  />
              </div>
              <div className="p-2 flex justify-end ">
                  <label className="flex items-center" htmlFor="password">Mot de passe :</label>
                  <input className="p-2 ml-2 w-3/4"
                      type="text"
                      name="password"
                      onChange={(e) => {
                          setPassword(e.target.value);
                      }}
                  />
              </div>
          </div>
      </form>
        <button className="w-1/4 p-3 mt-5 font-bold bg-gradient-to-b from-red-400 via-red-500 to-pink-500 " type="submit">Connexion</button>
    </div>
  );
};
export default Login;
