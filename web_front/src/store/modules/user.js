import api from '@/api'

import useRouteStore from './route'
import useMenuStore from './menu'

const useUserStore = defineStore(
    // 唯一ID
    'user',
    {
        state: () => ({
            account: localStorage.account || '',
            userAvatar: localStorage.userAvatar || '',
            token: localStorage.token || '',
            permissions: []
        }),
        getters: {
            isLogin: state => {
                let retn = false
                if (state.token) {
                    retn = true
                }
                return retn
            }
        },
        actions: {
            login(data) {
                return new Promise((resolve, reject) => {
                    api.post('api/login', data).then(res => {
                        localStorage.setItem('account', data.userId)
                        localStorage.setItem('token', res.data.token)
                        const routeStore = useRouteStore()
                        routeStore.isGenerate = false
                        routeStore.removeRoutes()
                        this.account = data.userId
                        this.token = res.data.token
                        api.get('/api/selfinfo').then(res => {
                            let avatar = import.meta.env.VITE_APP_API_BASEURL + res.data.info.avatar.replace('/', '')
                            localStorage.setItem('userAvatar', avatar)
                            this.userAvatar = avatar
                        })
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            logout() {
                return new Promise(resolve => {
                    const routeStore = useRouteStore()
                    const menuStore = useMenuStore()
                    localStorage.removeItem('account')
                    localStorage.removeItem('token')
                    localStorage.removeItem('userAvatar')
                    this.userAvatar = ''
                    this.account = ''
                    this.token = ''
                    this.permissions = [0]
                    routeStore.removeRoutes()
                    menuStore.setActived(0)
                    resolve()
                })
            },
            editPassword(data) {
                return new Promise(resolve => {
                    api.post('/api/editpassword', {
                        oldpassword: data.password,
                        newpassword: data.newpassword
                    }).then(() => {
                        resolve()
                    })
                })
            },
            getPermissions() {
                return new Promise(resolve => {
                    if (this.token) {
                        let strings = this.token.split('.') // 截取token，获取载体
                        let userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, '+').replace(/_/g, '/')))))
                        this.permissions = [userinfo['rights']]
                        resolve([userinfo['rights']])
                    } else {
                        resolve([0])
                    }
                })

            }
        }
    }
)

export default useUserStore
