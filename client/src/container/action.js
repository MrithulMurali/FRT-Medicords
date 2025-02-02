import * as actionTypes from "./types";
import * as AuthService from "../components/services/auth.service";

//Patient register action
export const registerAction = (payload) => (dispatch) => {
  return AuthService.register(payload)
    .then((response) => {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve(response.data);
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        payload: {
          err: "Unexpected error occured while registering!",
        },
      });

      return Promise.reject(error);
    });
};

//Patient Login Action

export const loginAction = (userCredential) => (dispatch) => {
  return AuthService.login(userCredential)
    .then((data) => {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: data,
      });
      return Promise.resolve(data);
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        payload: {
          err: error.message || "Unexpected error occured while logging in.",
        },
      });
      return Promise.reject(error);
    });
};

export const logoutAction = () => (dispatch) => {
  try {
    const msg = AuthService.logout();

    dispatch({
      type: actionTypes.LOGOUT,
      payload: { msg },
    });
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject(error);
  }
};
