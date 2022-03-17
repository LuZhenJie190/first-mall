import axios from 'axios'
// 利用axios对象的方法create创建一个axios实例，进行配置
const requests=axios.create({
    // 基础路劲
    baseURL:"",
    // 请求超时
    timeout:5000,
});
// 请求拦截器，在发送请求之前，拦截器可以检测到
requests.interceptors.request.use((config)=>{
    // 配置对象，headers请求头
    return config;
});

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功回调函数，检测到服务端的相应数据
    return res.data;
},(error)=>{
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'));
});

// 对外暴露
export default requests;