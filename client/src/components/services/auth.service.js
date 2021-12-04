import axios from "axios";

const baseURL = `https://${process.env.REACT_APP_BASE_URL}`;

//register request
export const register = (newPatient) => {
  //POST REQUEST on /api/register

  return axios
    .post(`${baseURL}/register-user`, newPatient)
    .then((response) => {
      if (response) {
        return Promise.resolve(response);
      }
    })
    .catch((err) => {
      return Promise.reject(err.response);
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

export const logout = () => {
  localStorage.removeItem("x-access-token");
  return { msg: "Logout successful!" };
};
