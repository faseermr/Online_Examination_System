import subjectServices from "../../service/subjectServices";
import {
  Get_All_Subject,
  Create_Subject,
  Delete_Subject,
  Update_Subject,
} from "./actionType";

export const getAllSubjectAction = () => async (dispatch) => {
  try {
    const res = await subjectServices.getAllSubject();
    //console.log(res.data);
    dispatch({
      type: Get_All_Subject,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addSubjectAction = (subject) => async (dispatch) => {
  try {
    const res = await subjectServices.create(subject);
    dispatch({
      type: Create_Subject,
      payload: res.data,
    });
    //console.log(res);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateSubjectAction = (id, subject) => async (dispatch) => {
  try {
    const res = await subjectServices.update(id, subject);
    dispatch({
      type: Update_Subject,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteSubjectAction = (id) => async (dispatch) => {
  try {
    let option = window.confirm("Are you want to delete");
    if (option) {
      const res = await subjectServices.deleteSubject(id);
      dispatch({
        type: Delete_Subject,
        payload: id,
      });
      return Promise.resolve(res.data);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
