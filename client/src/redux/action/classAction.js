import classServices from "../../service/classServices";
import {
  Get_All_Class,
  Create_Class,
  Update_Class,
  Delete_Class,
} from "./actionType";

export const getAllClassAction = () => async (dispatch) => {
  try {
    const res = await classServices.getAllClass();
    //console.log(res.data);
    dispatch({
      type: Get_All_Class,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addClassAction = (classroom) => async (dispatch) => {
  try {
    const res = await classServices.create(classroom);
    dispatch({
      type: Create_Class,
      payload: res.data,
    });
    //  console.log(res);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateClassAction = (id, classroom) => async (dispatch) => {
  try {
    const res = await classServices.updateClass(id, classroom);
    dispatch({
      type: Update_Class,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteClassAction = (id) => async (dispatch) => {
  try {
    let option = window.confirm("Are you want to delete");
    if (option) {
      const res = await classServices.deleteClass(id);
      dispatch({
        type: Delete_Class,
        payload: id,
      });
      return Promise.resolve(res.data);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
