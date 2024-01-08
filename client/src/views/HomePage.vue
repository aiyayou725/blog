<template>
  <div class="main-container">
    <div class="main-info">
      <div class="main-other">
        <div class="nav" style="margin: 20px 0 0 20px;">
          <n-split :default-size="1">
            <template #1>
              <n-menu default-value="home" mode="horizontal" :options="menuOptions" responsive @click="handleRoute"/>
            </template>
          </n-split>
        </div>
        <div class="clock" style="margin: 20px 20px 0 0;"><Clock></Clock></div>
      </div>
      <div class="main-text"><router-view></router-view></div>
    </div>
  </div>
</template>
<script setup>
import Clock from "../components/clock.vue"
import { h, ref } from "vue";
import { NIcon } from "naive-ui";
import {
  BookOutline as BookIcon,
  HomeOutline as PersonIcon,
  InformationCircleOutline as CategoryIcon,
  SettingsOutline as SettingsIcon
} from "@vicons/ionicons5";
import { RouterLink } from "vue-router";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = ref([
  {
    label: () => h(
      RouterLink,
      {
        to: { path: "/home" }
      },
      { default: '首页' }
    ),
    key: "home",
    icon: renderIcon(PersonIcon),
  },
  {
    label: () => h(
      RouterLink,
      {
        to: { path: "/blog" }
      },
      { default: '博客' }
    ),
    key: "blog",
    icon: renderIcon(BookIcon),
  },
  {
    label: () => h(
      RouterLink,
      {
        to: { path: "/dashboard/category" }
      },
      { default: '后台管理' }
    ),
    key: "dashboard",
    icon: renderIcon(SettingsIcon),
  }
]);

const handleRoute = () => {
  console.log("handleRoute");
}
</script>

<style lang="scss" scoped>
.main-container {
  height: 100vh;
  width: 100vw;
  background-color: #f1e3e1;
  display: flex;
  justify-content: center;
  align-items: center;
  .main-info {
    background-color: #fcfcfc;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    width: 90vw;
    height: 84vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .main-other {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .clock {
        z-index: 9999;
      }
    }
    .main-text {
      margin-top: -90px;
      flex: 1
    }
  }
  
}
:deep(.n-menu.n-menu--horizontal .n-menu-item-content) {
  padding: 0 10px;
}

</style>