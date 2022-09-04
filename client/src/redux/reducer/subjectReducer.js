import {
  Get_All_Subject,
  Create_Subject,
  Delete_Subject,
  Update_Subject,
} from "../action/actionType";

const initialState = {
  subjectList: [],
};

export const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_All_Subject:
      //console.log(action.payload.data);
      return {
        ...state,
        subjectList: action.payload,
      };

    case Create_Subject:
      return {
        ...state,
        //...action.payload
      };

    case Update_Subject:
      return {
        ...state,
      };

    case Delete_Subject:
      console.log(action.payload, state);
      return {
        ...state,
        subjectList: state.subjectList.filter(
          (cls) => cls.subid !== action.payload
        ),
      };

    default:
      return state;
  }
};
