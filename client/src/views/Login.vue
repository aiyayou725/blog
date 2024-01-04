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
                <n-checkbox v-model:checked="admin.rember" label="记住我" />
                <n-button @click="login">登录</n-button>
            </template>

        </n-card>
    </div>
</template>

<script setup>
import { reactive, ref, inject } from 'vue'
import { AdminStore } from "../store/AdminStore.js"

const message = inject("message")
const axios = inject("axios")
const adminStore = AdminStore()

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
    account: '',
    password: '',
    rember: false,
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
        message.success("登录成功")
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
    }

</style>