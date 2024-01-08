<template>
   <n-layout has-sider>
      <n-layout-sider
        collapse-mode="transform"
        :collapsed-width="120"
        :width="240"
        show-trigger="arrow-circle"
        content-style="padding: 24px;"
        bordered
      >
        <div class="menus">
          <div v-for="(menu, index) in menus" @click="toPage(menu)">{{ menu.name }}</div>
        </div>
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        <router-view></router-view>
      </n-layout-content>
    </n-layout>

  <div class="title">后台管理系统</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

let menus = [
  { name: "文章管理", href: "/dashboard/article" },
  { name: "分类管理", href: "/dashboard/category" },
  { name: "返回前台", href: "/" },
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
.menus {
  box-sizing: border-box;
  line-height: 55px;
  text-align: center;
  width: 180px;
  height: 95vh;
  div {
    cursor: pointer;
    &:hover {
      color: #18a058;
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