import request  from "./request";

const Api = {
  getAuthenticatedUser(token) {
    return request.get(`/user?token=${token}`)
  }
}

export default Api