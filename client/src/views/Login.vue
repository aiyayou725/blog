<template>
    <div class="login-panel">
        <n-card title="管理后台登录">
            <n-form :model="admin" :rules="rules">
                <n-form-item path="account" label="账号">
                    <n-input v-model:value="admin.account" placeholder="请输入账号" />
                </n-form-item>
                <n-form-item path="password" label="密码" >
                    <n-input v-model:value="admin.password" type="password" placeholder="请输入密码" />
                </n-form-item>
            </n-form>
            <template #footer>
                <div class="login-btn">
                    <n-checkbox v-model:checked="admin.rember" label="记住我" />
                    <n-button @click="login" type="primary">登录</n-button>
                </div>
            </template>

        </n-card>
    </div>
</template>

<script setup>
import { reactive, ref, inject } from 'vue'
import { AdminStore } from "../store/AdminStore.js"
import { useRouter, useRoute } from  'vue-router'

const message = inject("message")
const axios = inject("axios")
const adminStore = AdminStore()
const router = useRouter()
const route = useRoute()

let rules = {
    account: [
        { required: true, message: '请输入账号', trigger: "blur" },
        { min: 3, max: 12, message: "账号长度在 3 到 12 个字符之间", trigger: "blur" }
    ],
    password: [
        { required: true, message: '请输入账号', trigger: "blur" },
        { min: 3, max: 12, message: "账号长度在 3 到 12 个字符之间", trigger: "blur" }
    ],
}

const admin = reactive({
    account: localStorage.getItem('account') || "",
    password: localStorage.getItem('password') || "",
    rember: localStorage.getItem('rember') == 1 || false,
})

const login = async () => {
    let res = await axios.post("/admin/login", {
        account: admin.account,
        password: admin.password,
    })

    if (res.data.code == 200) {
        adminStore.id = res.data.data.id
        adminStore.account = res.data.data.account
        adminStore.token = res.data.data.token

        if (admin.rember) {
            localStorage.setItem("account", admin.account)
            localStorage.setItem("password", admin.password)
            localStorage.setItem("rember", admin.rember ? 1 : 0)
        }
        message.success("登录成功")
        router.push("/dashboard/article")
    } else {
        message.error("用户名或密码错误")
    }
    
}

</script>

<style lang="scss" scoped>
    .login-panel {
        width: 500px;
        margin: 0 auto;
        margin-top: 130px;
        .login-btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

</style>