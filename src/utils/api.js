import request from "./request";
import globalData from "./globalData";


const Api = {
  /**
   * 获取用户信息
   */
  getAuthenticatedUser() {
    return request.get(`http://localhost:8081/api/user`)
  },

  /**
   * 授权
   */
  auth(code) {
    console.log(code)
    let url = `http://localhost:8081/api/auth?code=${code}`
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
    return request.get(`http://localhost:8081/api/stars?page=${page}`)
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
  },

  /**
   * 添加标签
   */
  addTag(holder) {
    // return request.get(`/repos/${data.owner}/${data.repo}/readme`);
    const data = {
      tag: holder.name
    };
    
    const headers = {
      userId: globalData.getUserinfo().id
    }
    return request({
      method: 'post',
      url: 'http://localhost:8081/api/tags',
      data,
      headers
    })
  },

  /**
   * 获取标签数据
   */
  getTag() {
    const headers = {
      userId: globalData.getUserinfo().id
    }
    return request({
      method: 'get',
      url: 'http://localhost:8081/api/tags',
      headers
    })
  },

  /**
   * 更新标签
   */
  updateTag(holder) {
    const headers = {
      userId: globalData.getUserinfo().id
    }
    const data = {
      name: holder.name
    }
    return request({
      method: 'put',
      url: `http://localhost:8081/api/tags/${holder.id}`,
      headers,
      data
    });
  },

  /**
   * 删除tag
   */
  deleteTag(holder) {
    const headers = {
      userId: globalData.getUserinfo().id
    }
    
    return request({
      method: 'delete',
      url: `http://localhost:8081/api/tags/${holder.id}`,
      headers
    });
  }
}

export default Api
