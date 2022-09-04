import http from '../http-common';

const getAllSubject = () => {
    return http.get(`/subject`)
}

const getSubjectByGrade = (grade,student) => {
    return http.get(`/subject/grade/${grade}/${student}`)
}

const updateSubjectStatus = (sub_status,subid) => {
    return http.put(`/subject/update/${sub_status}/${subid}`)
}

const create = (data) => {
    return http.post(`/subject`,data)
}

const update = (subid,data) => {
    return http.put(`/subject/update/${subid}`,data)
}

const deleteSubject = (subid) => {
    return http.delete(`/subject/${subid}`)
}


export default {
    getAllSubject,
    getSubjectByGrade,
    updateSubjectStatus,
    create,
    update,
    deleteSubject
}


// getAllSubject() {
//     subjectServices.getAllSubject().then(res => {
//         console.log(res.data);
//       this.setState({
//         subjectList : res.data
//       })
//     })
//   }

//    async getAllSubject() {
//     const response = await subjectServices.getAllSubject()
//         this.setState({
//             subjectList : response.data
//         })
   
//       }