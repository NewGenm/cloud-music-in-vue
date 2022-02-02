import axios from 'axios';
export function request(url, params) {
    const instance = axios.create({
        // baseURL: 'http://localhost:8080/api',
        baseURL: 'https://cloud-music-in-vue.vercel.app/',
        timeout: 30000,
        withCredentials: true,
    })
    // axios拦截器
    // 请求拦截
    instance.interceptors.request.use(config => {
        // console.log('请求拦截器');
        return config
    }, err => {
        console.log(err);
    });

    // 响应拦截
    instance.interceptors.response.use(config => {
        return config;
    }, err => {
        console.log([err]);
        // if (err.response.data.msg == '需要登录') {
        //     // cookie过期 退出登录
        //     // console.log(window.localStorage.getItem("userInfo"));
        //     // window.localStorage.setItem("userInfo", "");
        //     // 刷新页面
        //     // history.go(0)
        //     // 修改当前的登录状态
        //     vuex.state.isLogin = false;
        // } else {
        //     console.log(err.response.data.msg);
        // }
    });

    instance.defaults.withCredentials = true;
    
    // 如果有携带params，就加入params，没有就直接使用url
    if (params) {
        params = {
            params: params
        }
        return instance.get(url, params)
    } else {
        return instance.get(url)
    }
}



