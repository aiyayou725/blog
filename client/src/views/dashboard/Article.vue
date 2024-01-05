<template>
  <n-tabs v-model:value="tabValue" justify-content="start" type="line">
    <n-tab-pane name="list" tab="文章列表">
      <div v-for="(blog, index) in blogsList" style="margin-bottom: 15px;">
        <n-card :title="blog.title">
          {{ blog.content }}
          <template #footer>
            <n-space align="center">
              <div>最近更新: {{ blog.update_time }}</div>
              <div>发布时间: {{ blog.create_time }}</div>
              <n-button strong secondary type="info" @click="updateBlog(blog)">编辑</n-button>
              <n-button strong secondary type="error" @click="editBlog(blog)">删除</n-button>
            </n-space>
          </template>
        </n-card>
      </div>

      <n-space>
        <div @click="toPage(pageNum)" v-for="pageNum in pageInfo.pageCount">
          <div :style="'color:' + (pageNum == pageInfo.page ? 'green' : '')">{{ pageNum }}</div>
        </div>
      </n-space>
    </n-tab-pane>

    <n-tab-pane name="add" tab="添加文章">
      <n-form>
        <n-form-item label="标题">
          <n-input v-model:value="addArticle.title" placeholder="请输入标题" />
        </n-form-item>
        <n-form-item label="分类">
          <n-select v-model:value="addArticle.categoryId" :options="categoryOptions" />
        </n-form-item>
        <n-form-item label="内容">
          <rich-text-editor v-model="addArticle.content"></rich-text-editor>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" @click="add">提交</n-button>
        </n-form-item>
      </n-form>
    </n-tab-pane>

    <n-tab-pane name="update" tab="修改文章">
      <n-form>
        <n-form-item label="标题">
          <n-input v-model:value="updateArticle.title" placeholder="请输入标题" />
        </n-form-item>
        <n-form-item label="分类">
          <n-select v-model:value="updateArticle.categoryId" :options="categoryOptions" />
        </n-form-item>
        <n-form-item label="内容">
          <rich-text-editor v-model="updateArticle.content"></rich-text-editor>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" @click="update">提交</n-button>
        </n-form-item>
      </n-form>
    </n-tab-pane>
  </n-tabs>
</template>

<script setup>
import { reactive, ref, onMounted, inject } from 'vue'
import RichTextEditor from '../../components/RichTextEditor.vue';
import moment from 'moment'

const axios = inject("axios")
const message = inject("message")
const addArticle = reactive({
  title: '',
  content: '',
  categoryId: 0
})
const updateArticle = reactive({
  id: 0,
  title: '',
  content: '',
  categoryId: 0
})

const tabValue = ref("list")
const categoryOptions = ref([])
const blogsList = ref([])
const pageInfo = reactive({
  page: 1,
  pageSize: 4,
  pageCount: 0,
  count: 0
})

onMounted(() => {
  loadBlogs()
  loadcategorys()
})

const loadBlogs = async () => {
  let res = await axios.get(`blog/search?page=${pageInfo.page}&pageSize=${pageInfo.pageSize}`)
  console.log("11111", res.data.data)
  let datas = res.data.data.rows
  for (let data of datas) {
    data.content += "..."
    data.update_time = moment(data.update_time).format('YYYY-MM-DD HH:mm:ss')
    data.create_time = moment(data.create_time).format('YYYY-MM-DD HH:mm:ss')
  }
  blogsList.value = datas
  pageInfo.count = res.data.data.count
  pageInfo.pageCount = Math.ceil(pageInfo.count / pageInfo.pageSize)
}

const loadcategorys = async () => {
  let res = await axios.get("/category/list")
  categoryOptions.value = res.data.data.map(item => {
    return {
      value: item.id,
      label: item.name
    }
  })
}

const add = async () => {
  let res = await axios.post("/blog/_token/add", addArticle)
  console.log(res.data)
  if (res.data.code == 200) {
    addArticle.title = ''
    addArticle.content = ''
    addArticle.categoryId = 0
    message.success("添加文章成功")
  } else {
    message.error(res.data.msg)
  }
}

const toPage = async (pageNum) => {
  pageInfo.page = pageNum
  loadBlogs()
}

const updateBlog = async (blog) => {
  tabValue.value = 'update'
  let res = await axios.get(`/blog/detail?id=${blog.id}`)
  console.log(res.data)
  updateArticle.id = blog.id
  updateArticle.title = res.data.data[0].title
  updateArticle.content = res.data.data[0].content
  updateArticle.categoryId = res.data.data[0].category_id
}

const update = async () => {
  let res = await axios.put("/blog/_token/update", updateArticle)
  console.log(res.data)
  if (res.data.code == 200) {
    // updateArticle.title = ''
    // updateArticle.content = ''
    // updateArticle.categoryId = 0
    message.success("修改文章成功")
    tabValue.value = "list"
    loadBlogs()
  } else {
    message.error(res.data.msg)
  }
}

</script>

<style lang="scss" scoped>

</style>