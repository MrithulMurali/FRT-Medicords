import axios from "axios";

const baseURL = `http://localhost:4000/api`;

//register request
export const register = (newPatient) => {
  //POST REQUEST on /api/register

  return axios
    .post(`${baseURL}/register`, newPatient)
    .then((response) => {
      if (response.data) {
        return Promise.resolve(response.data);
      }
    })
    .catch((err) => {
      return Promise.reject(err.response.data);
    });
};

export const login = (userCredential) => {
  //POST REQUEST on /api/login

  return axios
    .post(`${baseURL}/login`, userCredential)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("x-access-token", response.data.token);
      }
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject({ err: error.response.data });
    });
};
