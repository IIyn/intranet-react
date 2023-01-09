import React, { useState } from "react";

import logIn from "../services/accountManagement";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("owen.lopez@example.com");
  const [password, setPassword] = useState("owen.lopez");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    logIn({ email, password })
      .then((res) => {
        console.log("RESPONSE OK ", res.data);
        localStorage.setItem("token", res.data.token);
        dispatch(setUser(res.data.user));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      {/* <form
        onSubmit={() => {
          handleSubmit();
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form> */}
      <button
        onClick={() => {
          handleSubmit();
        }}
      >
        Se connecter avec Lopez
      </button>
    </div>
  );
};
export default Login;
