import http from '../http-common';

// get all class list
const getAllClass = () => {
    return http.get(`/classroom`)
}

// insert class details
const create = (data) => {
    return http.post(`/classroom`,data)
}

// delete class
const deleteClass = (grade) => {
    return http.delete(`/classroom/${grade}`)
}

// update class
const updateClass = (id,data) => {
    return http.put(`/classroom/update/${id}`,data)
}


export default {
    getAllClass,
    create,
    deleteClass,
    updateClass
}