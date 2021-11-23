import axios from "axios";

const baseURL = `http://localhost:${process.env.PORT}/api`;

//register request
const register = (newPatient) => {
  //POST REQUEST on /api/register

  axios
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
