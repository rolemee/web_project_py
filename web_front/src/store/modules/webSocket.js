let userStore
let ws, count = 0
let lockReconnect = false // 避免ws重复连接
let server, webSocket = false
let hasLogin = false
// 监听窗口关闭事件，当窗口关闭时，主动去关闭WebSocket连接，防止连接还没断开就关闭窗口，server端会抛异常
window.onbeforeunload = () => {
    if (webSocket)
        ws.close()
}
// 创建webSocket实例
let createWebSocket = server => {
    try {
        ws = new WebSocket(server)
        // 连接建立初始化
        initEventHandle(server)
        webSocket = true
    } catch (e) {
        console.log('捕获异常' + e)
    }
}

function initEventHandle(server) {
    // 连接成功
    ws.onopen = () => {
        console.log('连接成功')
        heartCheck.start(server)// 连接检测
        count = 0// 重置重连次数
    }
    // 连接失败
    ws.onclose = () => {
        console.log('连接关闭' + (new Date).toLocaleDateString())
    }
    // 连接异常
    ws.onerror = () => {
        reconnect(server)
    }
    // 收到信息
    ws.onmessage = event => {
        ElMessage.warning(event.data)
    }
}
// 重连
let reconnect = server => {
    if (count >= 5) return console.log('超出重连次数！')
    if (lockReconnect) return false
    lockReconnect = true
    let a = setTimeout(() => {     // 没连接上会一直重连，设置延迟避免请求过多
        createWebSocket(server)
        lockReconnect = false
        count++
    }, 1000)
    clearTimeout(a)
}

// 检测是否重新登录
const loginCheck = {
    timeout: 1000,        // 设置连接检测时间
    timeoutObj: null,
    start: () => {
        // console.log('?')
        // console.log(loginCheck.timeout)
        loginCheck.timeoutObj = setInterval(() => {
            // 当用户登录的时候会重新连接
            if (userStore.isLogin) {
                server = `ws:${import.meta.env.VITE_APP_API_BASEURL.replace('http:', '')}ws/${userStore.account}`
                createWebSocket(server)
                hasLogin = true
                clearInterval(loginCheck.timeoutObj)
            }
        }, loginCheck.timeout)
    }
}

// 连接检测
const heartCheck = {
    timeout: 2500,        // 设置连接检测时间
    timeoutObj: null,
    start: server => {
        heartCheck.timeoutObj = setInterval(() => {
            // 当用户登录的时候会判断是否连接
            if (userStore.isLogin) {
                if (ws.CONNECTING !== 0) {
                    // console.log('未连接')
                    reconnect(server)
                }
            }
            if (hasLogin && !userStore.isLogin) {
                clearInterval(heartCheck.timeoutObj)
                ws.close()
                hasLogin = false
                webSocket = false
                loginCheck.start(server)
            }
        }, heartCheck.timeout)
    }
}

let startWebSocket = useUserStore => {
    loginCheck.start()
    userStore = useUserStore()
    // console.log(loginCheck.reset())
}
export default {
    startWebSocket
}
