import axios from 'axios'
import qs from 'qs'
import router from '@/router/index'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

const toLogin = () => {
    useUserStore().logout().then(() => {
        router.push({
            name: 'login',
            query: {
                redirect: router.currentRoute.value.path !== '/login' ? router.currentRoute.value.fullPath : undefined
            }
        })
    })
}

const api = axios.create({
    baseURL: import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true' ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL,
    timeout: 10000,
    responseType: 'json'
})

api.interceptors.request.use(
    request => {
        const userStore = useUserStore()

        if (userStore.isLogin) {
            request.headers['Authorization'] = 'Bearer ' + userStore.token
        }
        // 是否将 POST 请求参数进行字符串化处理
        if (request.method === 'post') {
            request.data = qs.stringify(request.data, {
                arrayFormat: 'brackets'
            })
        }
        return request
    }
)

api.interceptors.response.use(
    response => {

        if (response.status === 200) {
            if (response.data.code === 200) {
                // 请求成功并且没有报错
                return Promise.resolve(response.data)
            } else {
                // 这里做错误提示
                ElMessage.error(response.data)
                return Promise.reject(response.data)
            }
        } else {
            toLogin()
        }
    },
    error => {
        let message = error.message
        if (message === 'Network Error') {
            message = '后端网络故障'
        } else if (message.includes('timeout')) {
            message = '接口请求超时'
        } else if (message.includes('Request failed with status code')) {
            message = '接口' + message.substr(message.length - 3) + '异常'
        }
        if (error.response.data.message === '未检测到token') {
            ElMessage.error('请先登录')
        } else if (error.response.data.message === 'token认证失败') {
            ElMessage.error('身份认证过期,请重新登录')
        } else {
            ElMessage({
                message,
                type: 'error'
            })
        }
        return Promise.reject(error)
    }
)

export default api
