<template>
  <div class="main-panel">
    <div class="menus">
      <div v-for="(menu, index) in menus" @click="toPage(menu)">{{ menu.name }}</div>
    </div>
    <div style="padding: 20px; width: 100%;">
      <router-view></router-view>
    </div>
  </div>
  <div class="title">后台管理系统</div>
</template>

<script setup>
import { AdminStore } from '../../store/AdminStore'
import { reactive, ref, inject } from 'vue' 
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const axios = inject("axios")
const store = AdminStore()

let menus = [
  { name: "文章管理", href: "/dashboard/article" },
  { name: "分类管理", href: "/dashboard/category" },
  { name: "退出", href: "logout" },
]

const toPage = (menu) => {
  if (menu.href == "logout") {
    router.push("/login")
  } else {
    router.push(menu.href)
  }
}

</script>

<style lang="scss" scoped>
.main-panel {
  display: flex;
  color: #64676a;
  max-width: 1500px;
  margin: 0 auto;
  .menus {
    padding: 20px 0;
    box-sizing: border-box;
    line-height: 55px;
    text-align: center;
    width: 180px;
    height: 95vh;
    border-right: 1px solid #dadada;

    div {
      cursor: pointer;
      &:hover {
        color: #18a058;
      }
    }
  }
}
.title {
  font-size: 45px;
  font-weight: 500;
  text-align: right;
  position: fixed;
  color: rgba(0, 0, 0, 20%);
  right: calc((100vw - 1400px) / 2);
  bottom: 20px;
}

</style>