import * as actionTypes from "./types";
const initialState = { isLoggedIn: false, patient: null };

//reducer

export default function rootReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        patient: payload.patient,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        patient: null,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        patient: null,
      };

    default:
      return state;
  }
}
