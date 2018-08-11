import request  from "./request";
import globalData from "./globalData";


const Api = {
  /**
   * 获取用户信息
   */
  getAuthenticatedUser() {
    return request.get(`/user`)
  },

  /**
   * 授权
   */
  auth(code) {
    console.log(code)
    let url = '/login/oauth/access_token'
    url = url + `?client_id=${globalData.CLIENT_ID}&client_secret=${globalData.CLIENT_SECRET}&code=${code}`
    const headers = {
      "Accept": "application/json"
    }
    return request({
      method: 'post',
      url,
      headers
    })
  },

  /**
   * star的项目
   */
  starred(page) {
    return request.get(`http://localhost:3000/user/starred?page=${page}`)
  },

  /**
   * 获取项目的readme
   */
  readMe(data) {
    const headers = {
      "Accept": "application/vnd.github.v3.html"
    }
    const url = `https://api.github.com/repos/${data.owner}/${data.repo}/readme`;
    // return request.get(`/repos/${data.owner}/${data.repo}/readme`);
    return request({
      method: 'get',
      url,
      headers
    })
  }
}

export default Api