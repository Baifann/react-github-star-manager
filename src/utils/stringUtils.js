const StringUtils = {
  isBlank(str) {
    return str === null || str === ''
  },

  /**
   * 获取url上的参数
   */
  getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return (false);
  },

  /**
   * 深拷贝
   */
  deepCopy(obj) {
    const jsonObj = JSON.stringify(obj);
    return JSON.parse(jsonObj);
  }
}

export default StringUtils
