import http from '../http-common';

const studentLogin = (data) => {
    return http.post(`/login`,data)
}

const studentSignup = (data) => {
    return http.post('/login/signup',data)
}


export default {
    studentLogin,
    studentSignup
}