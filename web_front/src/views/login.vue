<route>
{
    meta: {
        title: "登录",
        constant: true,
        layout: false
    }
}
</route>

<script setup name="Login">
import api from '@/api'
const { proxy } = getCurrentInstance()
const route = useRoute(), router = useRouter()

import useSettingsStore from '@/store/modules/settings'
const settingsStore = useSettingsStore()
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()

const title = import.meta.env.VITE_APP_TITLE

// 表单类型，login 登录，reset 重置密码
const formType = ref('login')

// 登录
const loginForm = ref({
    account: localStorage.login_account || '',
    password: '',
    remember: !!localStorage.login_account
})
const loginRules = ref({
    account: [
        { required: true, trigger: 'blur', message: '请输入用户名' }
    ],
    password: [
        { required: true, trigger: 'blur', message: '请输入密码' }
    ]
})
function handleLogin() {
    proxy.$refs.loginFormRef.validate(valid => {
        if (valid) {
            loading.value = true
            // console.log(loginForm.value)
            let cacheData = {
                userId: loginForm.value.account,
                password: loginForm.value.password
            }
            userStore.login(cacheData).then(() => {
                loading.value = false
                if (loginForm.value.remember) {
                    localStorage.setItem('login_account', loginForm.value.account)
                } else {
                    localStorage.removeItem('login_account')
                }
                router.push(redirect.value)
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

// 注册
const registerForm = ref({
    account: '',
    password: '',
    checkPassword: ''
})
const registerRules = ref({
    account: [
        { required: true, trigger: 'blur', message: '请输入用户名' }
    ],
    password: [
        { required: true, trigger: 'blur', message: '请输入密码' }
    ],
    checkPassword: [
        { required: true, trigger: 'blur', message: '请再次输入密码' },
        { validator: (rule, value, callback) => {
            if (value !== registerForm.value.password) {
                callback(new Error('两次输入的密码不一致'))
            } else {
                callback()
            }
        } }
    ]
})
function handleRegister() {
    proxy.$refs.registerFormRef.validate(valid => {
        if (valid) {
            api.post('/api/register', {
                userId: registerForm.value.account,
                username: registerForm.value.account,
                password: registerForm.value.password
            }).then(res => {
                ElMessage.success(res.message)
                formType.value = 'login'
            })
        }
    })
}

// 重置密码
const resetForm = ref({
    account: localStorage.login_account || '',
    captcha: '',
    newPassword: ''
})
const resetRules = ref({
    account: [
        { required: true, trigger: 'blur', message: '请输入用户名' }
    ],
    captcha: [
        { required: true, trigger: 'blur', message: '请输入验证码' }
    ],
    newPassword: [
        { required: true, trigger: 'blur', message: '请输入新密码' },
        { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' }
    ]
})

const loading = ref(false)
const passwordType = ref('password')
const redirect = ref(null)

onMounted(() => {
    redirect.value = route.query.redirect ?? '/'
})

function showPassword() {
    passwordType.value = passwordType.value === 'password' ? '' : 'password'
    nextTick(() => {
        proxy.$refs.password.focus()
    })
}
</script>

<template>
    <div>
        <div class="bg-banner" />
        <div id="login-box">
            <el-form v-show="formType === 'login'" ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on">
                <div class="title-container">
                    <h3 class="title">欢迎来到 {{ title }} ! </h3>
                </div>
                <div>
                    <el-form-item prop="account">
                        <el-input ref="name" v-model="loginForm.account" placeholder="用户名" text tabindex="1" autocomplete="on">
                            <template #prefix>
                                <el-icon>
                                    <svg-icon name="user" />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码" tabindex="2" autocomplete="on" @keyup.enter="handleLogin">
                            <template #prefix>
                                <el-icon>
                                    <svg-icon name="password" />
                                </el-icon>
                            </template>
                            <template #suffix>
                                <el-icon>
                                    <svg-icon :name="passwordType === 'password' ? 'eye' : 'eye-open'" @click="showPassword" />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="flex-bar">
                    <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
                    <el-link type="primary" :underline="false" @click="formType = 'reset'">忘记密码了?</el-link>
                </div>
                <el-button :loading="loading" type="primary" size="large" style="width: 100%;" @click.prevent="handleLogin">登录</el-button>
                <div class="sub-link">
                    <span class="text">还没有帐号?</span>
                    <el-link type="primary" :underline="false" @click="formType = 'register'">创建新帐号</el-link>
                </div>
            </el-form>
            <el-form v-show="formType === 'register'" ref="registerFormRef" :model="registerForm" :rules="registerRules" class="login-form" auto-complete="on">
                <div class="title-container">
                    <h3 class="title">探索从这里开始! 🚀</h3>
                </div>
                <div>
                    <el-form-item prop="account">
                        <el-input ref="name" v-model="registerForm.account" placeholder="用户名" tabindex="1" autocomplete="on">
                            <template #prefix>
                                <el-icon>
                                    <svg-icon name="user" />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input ref="password" v-model="registerForm.password" :type="passwordType" placeholder="密码" tabindex="3" autocomplete="on">
                            <template #prefix>
                                <el-icon>
                                    <svg-icon name="password" />
                                </el-icon>
                            </template>
                            <template #suffix>
                                <el-icon>
                                    <svg-icon :name="passwordType === 'password' ? 'eye' : 'eye-open'" @click="showPassword" />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="checkPassword">
                        <el-input ref="checkPassword" v-model="registerForm.checkPassword" :type="passwordType" placeholder="确认密码" tabindex="4" autocomplete="on">
                            <template #prefix>
                                <el-icon>
                                    <svg-icon name="password" />
                                </el-icon>
                            </template>
                            <template #suffix>
                                <el-icon>
                                    <svg-icon :name="passwordType === 'password' ? 'eye' : 'eye-open'" @click="showPassword" />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <el-button :loading="loading" type="primary" size="large" style="width: 100%; margin-top: 20px;" @click.prevent="handleRegister">注册</el-button>
                <div class="sub-link">
                    <span class="text">已经有帐号?</span>
                    <el-link type="primary" :underline="false" @click="formType = 'login'">去登录</el-link>
                </div>
            </el-form>
            <el-form v-show="formType == 'reset'" ref="resetFormRef" :model="resetForm" :rules="resetRules" class="login-form" auto-complete="on">
                <div class="title-container">
                    <h3 class="title">修改密码</h3>
                </div>
                <div>
                    <el-form-item prop="account">
                        <el-input ref="name" v-model="resetForm.account" placeholder="用户名" tabindex="1" autocomplete="on">
                            <template #prefix>
                                <el-icon>
                                    <svg-icon name="user" />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="oldPassword">
                        <el-input ref="oldPassword" v-model="resetForm.newPassword" :type="passwordType" placeholder="旧密码" tabindex="2" autocomplete="on">
                            <template #prefix>
                                <el-icon>
                                    <svg-icon name="captcha" />
                                </el-icon>
                            </template>
                            <template #append>
                                <el-button>发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="newPassword">
                        <el-input ref="newPassword" v-model="resetForm.newPassword" :type="passwordType" placeholder="新密码" tabindex="3" autocomplete="on">
                            <template #prefix>
                                <el-icon>
                                    <svg-icon name="password" />
                                </el-icon>
                            </template>
                            <template #suffix>
                                <el-icon>
                                    <svg-icon :name="passwordType === 'password' ? 'eye' : 'eye-open'" @click="showPassword" />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <el-button :loading="loading" type="primary" size="large" style="width: 100%; margin-top: 20px;">确认</el-button>
                <div class="sub-link">
                    <el-link type="primary" :underline="false" @click="formType = 'login'">返回登录</el-link>
                </div>
            </el-form>
        </div>
        <Copyright v-if="settingsStore.copyright.enable" style="color: black"/>
    </div>
</template>

<style lang="scss" scoped>
[data-mode="mobile"] {
    #login-box {
        position: relative;
        width: 100%;
        height: 100%;
        top: inherit;
        left: inherit;
        transform: translateX(0) translateY(0);
        flex-direction: column;
        justify-content: start;
        border-radius: 0;
        box-shadow: none;
        .login-banner {
            width: 100%;
            padding: 20px 0;
            .banner {
                position: relative;
                right: inherit;
                width: 100%;
                max-width: 375px;
                margin: 0 auto;
                display: inherit;
                top: inherit;
                transform: translateY(0);
            }
        }
        .login-form {
            width: 100%;
            min-height: auto;
            padding: 30px;
        }
    }
    .copyright {
        position: relative;
        bottom: 0;
        padding-bottom: 10px;
    }
}
:deep(input[type="password"]::-ms-reveal) {
    display: none;
}
.bg-banner {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    background: url("@/assets/images/login-backgrond.png") no-repeat;
    background-size: cover;
}
#login-box {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: rgba(255, 255, 255, 0.73);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: var(--el-box-shadow);
    .login-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 500px;
        width: 500px;
        padding: 50px;
        overflow: hidden;
        .title-container {
            position: relative;
            .title {
                font-size: 1.3em;
                color: var(--el-text-color-primary);
                margin: 0 auto 30px;
                font-weight: bold;
            }
        }
    }
    .el-form-item {
        margin-bottom: 24px;
        :deep(.el-input) {
            height: 48px;
            line-height: inherit;
            width: 100%;
            input {
                height: 48px;
            }
            .el-input__prefix,
            .el-input__suffix {
                display: flex;
                align-items: center;
            }
            .el-input__prefix {
                left: 10px;
            }
            .el-input__suffix {
                right: 10px;
            }
        }
    }
    .flex-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .sub-link {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        font-size: 14px;
        color: var(--el-text-color-secondary);
        .text {
            margin-right: 10px;
        }
    }
}
.copyright {
    position: absolute;
    bottom: 30px;
    width: 100%;
    margin: 0;
}
</style>
