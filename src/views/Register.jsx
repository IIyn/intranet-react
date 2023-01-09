import React from "react";

import { useNavigate } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <form action="submit">
        <input type="text" placeholder="username" />
        <input type="text" placeholder="email" />
        <input type="text" placeholder="password" />
      </form>
    </div>
  );
};

export default Register;
