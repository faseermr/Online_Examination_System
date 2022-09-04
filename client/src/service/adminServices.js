import http from '../http-common';

const adminLogin = (data) => {
    return http.post(`/admin`,data)
}

export default {
    adminLogin
}