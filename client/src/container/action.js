import * as actionTypes from "./types";
import * as AuthService from "../components/services/auth.service";

//register action
export const registerAction = (payload) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload,
  };
};
