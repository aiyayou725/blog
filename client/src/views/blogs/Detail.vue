<template>
  <div class="container">
    <div class="header" @click="handleBack">
      <n-icon :component=ArrowBack size="24"></n-icon>
      <div class="back-home">回到博客列表页</div>
  </div>

  <div class="main-container">
    <div class="article-info">
      <n-h1 style="margin: 20px 0;" align="center">{{ blogInfo.title }}</n-h1>
      <div class="times">
        <n-space>
          <div class="label">最近更新:{{ blogInfo.update_time }}</div>
          <div class="label">发布时间:{{ blogInfo.create_time }}</div>
        </n-space>
      </div>
      <div class="blog-content">
        <div v-html="blogInfo.content"></div>
      </div>
    </div>

    <div class="aside">
      <img src="../../assets/blog-aside.jpg" alt="">
      <div class="list">
        <div class="blog-list" v-for="(item, index) in blogListInfo" @click="toOther(item)" style="cursor: pointer;">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>

  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowBack } from "@vicons/ionicons5";
import moment from 'moment'

const router = useRouter()
const route = useRoute()
const blogInfo = ref({})
const axios = inject("axios")

onMounted(() => {
  loadBlog()
  loadBlogs(0)
})

const blogListInfo = ref([])

//读取博客列表
const loadBlogs = async (page = 0) => {
  if (page != 0) {
    pageInfo.page = page;
  }
  let res = await axios.get(`/blog/search`)
  let datas = res.data.data.rows;
  blogListInfo.value = datas;
  console.log("++++", blogListInfo.value)
}

const toOther = async (item) => {
  router.push({path:"/detail", query:{id:item.id}})
  await loadBlog()
  
}

/**
* 读取文章详情
*/
const loadBlog = async () => {
  let res = await axios.get("/blog/detail?id=" + route.query.id)
  let infos = res.data.data[0]
  infos.update_time = moment(infos.update_time).format('YYYY-MM-DD HH:mm:ss')
  infos.create_time = moment(infos.create_time).format('YYYY-MM-DD HH:mm:ss')
  blogInfo.value = infos;
  console.log(blogInfo.value)
}

const handleBack = ()=>{
  router.push("/blog")
}

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .header {
    display: flex;
    align-items: center;
    color: #333;
    font-size: 18px;
    width: 100%;
    height: 60px;
    background-color: #fcfcfc;
    position: fixed;
    top: 0;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 3px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }
  .main-container {
    width: 90vw;
    display: flex;
    .article-info {
    width: 75vw;
    margin: 80px auto 0;
    background-color: #fcfcfc;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1); 
    .times {
      display: flex;
      justify-content: center;
      .label {
        font-size: 12px;
        color: #ccc;
      }
  
    }
    .blog-content {
      padding: 30px;
      width: 70vw;
      height: 100vh;
      overflow-y: auto;
    }
  }
  .aside {
    margin-top: 80px;
    margin-left: 20px;

    img {
      width: 100%;
      border-radius: 10px;
    }
    .list {
      background-color: #fcfcfc;
      border-radius: 10px;
      margin-top: 10px;

      .blog-list {
        height: 5vh;
        border-bottom: 1px solid #eee;
        line-height: 6vh;
        padding: 0 8px;
        overflow: hidden;//溢出隐藏
        text-overflow: ellipsis;//省略号
        white-space: nowrap;//强制文本不换行
      }
      :hover {
        background-color: #f8ecea;
      }
    }
  }
  }
}
</style>
