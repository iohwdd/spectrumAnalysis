import axios from 'axios'
import router from '@/router'
// import { Message } from 'element-ui';
// import { MessageBox, Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: '/api',
  timeout: 60000
})

// request interceptor
// service.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("Authorization");
//     // console.log('request',token)
//     // 判断token存在再做配置
//     // 注意：token前边有 'Bearer ' 的信息前缀,API接口需求，Bearer后边有空格
//     config.headers.Authenticator = token;
//     return config;
//   },
//   (error) => {
//     // console.log(error); // for debug
//     router.replace({
//       path: "/login",
//     });
//     return Promise.reject(error);
//   }
// );

// response interceptor /后端给前端
// service.interceptors.response.use(
//   //response里有状态值/文本/heads/config/resqest里的一些方法/data
//   (response) => {
//     const res = response.data ?? response;

//     if (response.status !== 200) {
//       return Promise.reject(new Error("Error"));
//     } else {
//       localStorage.setItem("Authorization", response.headers.authenticator);
//       return res;
//     }
//   },
//   (error) => {
//     //超出2xx范围的状态码都会触发该函数
//     if (error.response.status === 401) {
//       router.replace({
//         path: "/login",
//       });
//     } else {
//       console.log("err" + error); // for debug
//       //对响应错误做些什么
//       return Promise.reject(error);
//     }
//   }
// );

export default service
