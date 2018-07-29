const globalData = {
  CLIENT_ID: "0bc1c6cc76293988be2d",
  token: "" || sessionStorage.getItem("token"),

  setToken(token) {
    sessionStorage.setItem("token", token)
  }
}

export default globalData