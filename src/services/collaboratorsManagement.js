import axios from "axios";
// import contact from "./contact";

export default async function getRandomCollaborator() {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await axios.get(
    "http://localhost:9000/api/collaborateurs/random",
    options
  );
}
