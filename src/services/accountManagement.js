import axios from "axios";
// import contact from "./contact";

export default async function logIn(payload) {
  return await axios.post("http://localhost:9000/api/login", payload);
}

export async function changeProfile(payload, id) {
  // check if user id token is the same as the user we want to change
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await axios.put(
    `http://localhost:9000/api/collaborateurs/${id}`,
    payload
  );
}
