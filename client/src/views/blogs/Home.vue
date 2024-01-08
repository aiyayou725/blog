<template>
  <div class="home">
    <div class="home-title">Hi! 欢迎来到“呼啦呼啦”的个人网站！</div>
    <div class="home-detail">
      <p>这里是一个分享知识的个人站点</p>
      <p>本站点基于 Vue3+Native UI+Vite 进行构建</p>
      <p>并通过xxx进行部署</p>
      <p style="display: flex; align-items: center;">欢迎为我的
        <a href="https://github.com/aiyayou725/blog"><n-button text color="#1b72d8" size="large">
          <template #icon>
            <n-icon :component="LogoGithub" />
          </template>
          Github
        </n-button></a>
      点赞</p>
      <p></p>
    </div>
  <img src="../../assets/bg.jpg" alt="">
  </div>
</template>

<script setup>
import { LogoGithub } from "@vicons/ionicons5";


</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}
.home-title {
    text-align: center;
    font: bold 200% Consolas, Monaco, monospace;
    border-right: 0.1em solid;
    width: 31ch;
    margin: 2em 1em;
    white-space: nowrap;
    overflow: hidden;
    animation: typing 3s steps(26, end),
        cursor-blink 0.3s step-end infinite alternate;
}



@keyframes typing {
    from {
        width: 0;
    }
}

@keyframes cursor-blink {
    50% {
        border-color: transparent;
    }
}

p {
  font-size: 18px;
  z-index: 9999;
}

p:nth-child(1) {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: flyIn1 0.5s forwards;
}

p:nth-child(2) {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: flyIn2 0.5s forwards;
}

p:nth-child(3) {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: flyIn3 0.5s forwards;
}

p:nth-child(4) {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: flyIn4 0.5s forwards;
}

p:nth-child(5) {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: flyIn5 0.5s forwards;
}
/* 定义飞入的动画效果 */
@keyframes flyIn1 {
  to {
    bottom: 52%;
    opacity: 1;
  }
}

/* 定义飞入的动画效果 */
@keyframes flyIn2 {
  to {
    bottom: 46%;
    opacity: 1;
  }
}

/* 定义飞入的动画效果 */
@keyframes flyIn3 {
  to {
    bottom: 40%;
    opacity: 1;
  }
}

/* 定义飞入的动画效果 */
@keyframes flyIn4 {
  to {
    bottom: 34%;
    opacity: 1;
  }
}

@keyframes flyIn5 {
  to {
    bottom: 10%;
    opacity: 1;
  }
}

/* 设置不同的动画延迟 */
p:nth-child(1) {
  animation-delay: 2.5s; /* 第一个 <p> 延迟 0.5 秒开始 */
}

p:nth-child(2) {
  animation-delay: 3s; /* 第二个 <p> 延迟 1 秒开始 */
}

p:nth-child(3) {
  animation-delay: 3.5s; /* 第三个 <p> 延迟 1.5 秒开始 */
}

p:nth-child(4) {
  animation-delay: 4s; /* 第三个 <p> 延迟 1.5 秒开始 */
}

p:nth-child(5) {
  animation-delay: 4.5s; /* 第三个 <p> 延迟 1.5 秒开始 */
}


img {
  width: 75%;
  position: absolute;
  bottom: 8%;
}

</style>