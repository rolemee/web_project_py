<route>
{
    meta: {
    title: "修改邮箱"
    }
}
</route>

<script setup name="PersonalEditEmail">
import api from '@/api'

const route = useRoute(), router = useRouter()

import useUserStore from '@/store/modules/user'
const userStore = useUserStore()

const form = ref({
    email: '',
    captcha: ''
})

const rules = ref({
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', trigger: 'blur', message: '请输入正确的邮箱格式' }
    ],
    captcha: [
        { required: true, trigger: 'blur', message: '请输入验证码' },
        { min: 4, max: 4, trigger: 'blur', message: '验证码长度必须为4位' }
    ]
})

const disableButton = ref(false)
const TIP_TEXT = '{{time}}s后重新获取'
const DELAY_TIME = 25
let nowTime = ref(DELAY_TIME)
const text = ref('发送验证码')
const formRef = ref(null)
function sendCaptcha() {
    nowTime.value = DELAY_TIME
    formRef.value.validateField('email', valid => {
        if (valid) {
            new Promise((resolve, reject) => {
                // 获取权限
                api.post('/api/sendmail', {
                    mail: form.value.email
                }).then(() => {
                    ElMessage({
                        type: 'success',
                        message: '验证码已经发至邮箱'
                    })
                }).catch(error => {
                    reject(error)
                })
            })
            text.value = TIP_TEXT.replace('{{time}}', nowTime.value)
            let checkFlag = setInterval(() => {
                nowTime.value--
                if (nowTime.value <= 0) {
                    text.value = '发送验证码'
                    clearInterval(checkFlag)
                    disableButton.value = false
                } else {
                    text.value = TIP_TEXT.replace('{{time}}', nowTime.value)
                }
            }, 1000)
        }
    })
}

function onSubmit() {
    formRef.value.validate(valid => {
        if (valid) {
            api.post('api/checkmail', {
                mail: form.value.email,
                checknum: form.value.captcha
            }).then(() => {
                ElMessage({
                    type: 'success',
                    message: '邮箱绑定成功'
                })
                goBack()
            }).catch(() => {})
        }
    })
}
function goBack() {
    router.push({ name: 'personalSetting' })
}
</script>

<template>
    <div>
        <page-header title="修改邮箱" content="绑定邮箱可以提高帐号安全性噢~">
            <el-button size="default" round @click="goBack">
                <template #icon>
                    <el-icon>
                        <svg-icon name="ep:arrow-left" />
                    </el-icon>
                </template>
                返回
            </el-button>
        </page-header>
        <page-main>
            <el-row>
                <el-col :md="24" :lg="12">
                    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="form.email" type="text" placeholder="请输入邮箱号" />
                        </el-form-item>
                        <el-form-item label="验证码" prop="captcha">
                            <el-input ref="captcha" v-model="form.captcha" type="text" autocomplete="on" placeholder="请输入验证码">
                                <template #append>
                                    <el-button :disabled="disableButton" @click="sendCaptcha">{{ text }}</el-button>
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </page-main>
        <fixed-action-bar>
            <el-button size="large" @click="goBack">取消</el-button>
            <el-button type="primary" size="large" @click="onSubmit">提交</el-button>
        </fixed-action-bar>
    </div>
</template>
