import { createStore } from "redux";
import rootReducer from "./reducer";

//create new store
const store = createStore(rootReducer);

export default store;
