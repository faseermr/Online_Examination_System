import {Get_Admin_Data,Get_User_Data,Not_Login,Get_All_Class} from './actionType'

export const getUserDataAction = () => ({type:Get_User_Data})
export const getAdminDataAction = () => ({type:Get_Admin_Data})
export const notLoginUserAction = () => ({type:Not_Login})
