import axios from 'axios';

class Api {
  $http = axios.create({
    baseURL: '//localhost:3000/api/v1/',
    headers: {
      token: `${localStorage.token}`,
    },
  });
  catch () {
    console.log(this);
  }

  register(data) {
    return this.$http.post('./api/user/register', data);
  }
  /** 登录接口 */
  login(data) {
    return this.$http.post('user/login', data);
  }

  getUser() {
    return this.$http.get('./api/user');
  }

  addTag(data) {
    return this.$http.post('./api/article/addtag', data);
  }
  getTagList() {
    return this.$http.get('./api/article/taglist');

  }
  deleteTag(id) {
    return this.$http.delete(`./api/article/deletetag/${id}`);
  }
  createArticle(data) {
    return this.$http.post('blog/submitBlog', data);
  }
  getArticleList(data) {
    return this.$http.post(`blog/findAll`, {
      pageNo: data.page,
      pageSize: data.pageSize
    });
  }
  // 获取文章详情
  getArticle(id) {
    return this.$http.get(`blog/findOne/${id}`);
  }
  deleteArticle(id) {
    return this.$http.delete(`./api/article`, {
      params: {
        id: id
      }
    });
  }
  // 获取数据库里的工时
  getworkingHours() {
    return this.$http.get(`./api/tool/getworkingHours`);
  }
  // 同步数据库里的工时
  synchronizationWorkingHours() {
    return this.$http.get(`./api/tool/workingday`);
  }
  pulSynchronizationWorkingHours(data) {
    return this.$http.post("./api/tool/synchronizationWorkingHours", data);
  }

}

export default Api;