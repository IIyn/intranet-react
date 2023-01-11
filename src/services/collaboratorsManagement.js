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

export async function getCollaboratorByID(id) {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await axios.get(
    `http://localhost:9000/api/collaborateurs/${id}`,
    options
  );
}

export async function addCollaborator(payload) {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await axios.post(
    `http://localhost:9000/api/collaborateurs/`,
    payload,
    options
  );
}

export async function deleteCollaborator(id) {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await axios.delete(
    `http://localhost:9000/api/collaborateurs/${id}`,
    options
  );
}
