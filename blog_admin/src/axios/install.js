import Api from './api';
import router from '@/router'
const api = new Api();
// 状态码错误信息
api.$http.interceptors.request.use((res) => {
  const req = res;
  req.headers.Authorization = localStorage.token ? `Bearer ${localStorage.token}` : '';
  return req;
});
api.$http.interceptors.response.use((res) => {
  // loading close...
  return res;
},
  error => {
    if (error) {
      if (error.response) {

        // 获取状态码
        const status = error.response.status;
        const errorText = error.response.data.message
        const errorData = {
          status,
          errorText
        }
        switch (status) {
          case 401:
            localStorage.clear();
            sessionStorage.clear()
            router.push("/")
            break;
          case 404:
            console.log("淡定, 只是404而已")
            break;
          case 400:
            console.log("未知错误")
            break;
          case 500:
            console.log("服务器内部错误")
            break;
          default:
            localStorage.clear();
            sessionStorage.clear()
            router.push("/")
            break;
        }

        return Promise.reject(errorData);
      } else {
        localStorage.clear();
        sessionStorage.clear()
        router.push("/")
      }
    }
    return Promise.reject(error);
  });

const install = function apiFun(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        return api;
      },
    },
  });
};

export default {
  install,
};
