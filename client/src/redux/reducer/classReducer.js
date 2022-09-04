import {Get_All_Class,Create_Class,Update_Class,Delete_Class} from '../action/actionType'

const initialState = {
    classList:[]
}

export const classReducer = (state=initialState,action) => {
    switch(action.type){
        case Get_All_Class :
            return {
                ...state,
                classList:action.payload.data
            }
        
        case Create_Class:
            return {
                ...state,
                //...action.payload
            }

        case Update_Class:
            return {
                ...state
            }

        case Delete_Class :
           // console.log(action.payload,state);
            return {
                ...state,
                classList:state.classList.filter(cls => cls.clsid !== action.payload)
            }

        default:
            return state
    }
}

