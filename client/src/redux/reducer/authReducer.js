import { Get_Admin_Data, Get_User_Data, Not_Login } from "../action/actionType";

export const getUserDataReducer = (state, action) => {
  switch (action.type) {
    case Get_User_Data:
      return {
        ...state,
        userdata: JSON.parse(localStorage.getItem("student")),
      };

    case Get_Admin_Data:
      return {
        ...state,
        adminData: JSON.parse(localStorage.getItem("admin")),
      };

    default:
      return (state = "No Data");
  }
};
