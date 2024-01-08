<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view></router-view>
  </n-config-provider>
</template>

<script setup>
import themeOverrides from "./theme.ts"

</script>

<style scoped>
</style>
