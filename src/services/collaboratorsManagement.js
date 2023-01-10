import axios from "axios";

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

export async function getAllCollaborators() {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await axios.get("http://localhost:9000/api/collaborateurs/", options);
}

export async function addCollaborator() {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  };
  return await axios.post(
    `http://localhost:9000/api/collaborateurs/${id}`,
    options,
    payload
  );
}

export async function deleteCollaborator(id) {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  await axios.delete(`http://localhost:9000/api/collaborateurs/${id}`, options);
}
