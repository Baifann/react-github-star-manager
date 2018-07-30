const globalData = {
  CLIENT_ID: "",
  CLIENT_SECRET: "",
  token: "" || sessionStorage.getItem("token"),

  setToken(token) {
    sessionStorage.setItem("token", token)
  }
}

export default globalData