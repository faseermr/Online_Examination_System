import http from '../http-common';

// post question
const createQuestion = (data) => {
    return http.post(`/question`,data)
}

// get all question
const getAllQuestion = () => {
    return http.get(`/question`)
}
// get student answers
const getStudentAnswer = (student) => {
    return http.get(`/answer/${student}`)
}

const answerQuestion = (data) => {
    return http.post(`/answer`,data)
}

const answerByStudent = (student) => {
    return http.get(`/answer/student/${student}`)
}

// get question by subject and student
const getQuestionBySubjectAndStudent = (subject,student) => {
    return http.get(`/question/${subject}/${student}`)
}

// get question by subject
const getQuestionBySubject = (subject) => {
    return http.get(`/question/subject/${subject}`)
}

const submitAnswer = (data) => {
    return http.post(`/answer/submit`,data)
}

const getQuestionById = (qid) => {
    return http.get(`/question/quiz/${qid}`)
}

const updateQuiz = (qid,data) => {
    return http.put(`/question/quiz/update/${qid}`,data)
}

const deleteQuiz = (qid) => {
    return http.delete(`/question/quiz/delete/${qid}`)
}



export default {
    createQuestion,
    getAllQuestion,
    getStudentAnswer,
    answerQuestion,
    answerByStudent,
    getQuestionBySubjectAndStudent,
    submitAnswer,
    getQuestionBySubject,
    getQuestionById,
    updateQuiz,
    deleteQuiz
}