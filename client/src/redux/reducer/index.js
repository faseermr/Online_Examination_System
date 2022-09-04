import { combineReducers } from "redux";
import { getUserDataReducer } from "../reducer/authReducer";
import { classReducer } from "../reducer/classReducer";
import { subjectReducer } from "./subjectReducer";

export const rootReducer = combineReducers({
  user: getUserDataReducer,
  classData: classReducer,
  subjectData: subjectReducer,
});
