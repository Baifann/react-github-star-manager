const globalData = {
  CLIENT_ID: "0bc1c6cc76293988be2d",
  CLIENT_SECRET: "895513b8aada3090b107874e4a1a3466e134156f",
  token: "" || sessionStorage.getItem("token"),
  code: "" || sessionStorage.getItem("code"),
  _userInfo: null,

  setToken(token) {
    this.token = token;
    sessionStorage.setItem("token", token)
  },

  setCode(code) {
    sessionStorage.setItem('code', code)
  },

  setUserInfo(userInfo) {
    this._userInfo = userInfo;
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
  },

  getUserinfo() {
    let userInfo = null
    try {
      userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    } catch (error) {
      
    } finally {
      return userInfo || this._userInfo;
    }
  }
}

export default globalData
