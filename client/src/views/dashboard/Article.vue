<template>
  <n-tabs default-value="list" justify-content="start" type="line">
    <n-tab-pane name="list" tab="文章列表">
      <div v-for="(blog, index) in blogsList" style="margin-bottom: 15px;">
        <n-card :title="blog.title">
          {{ blog.content }}
          <template #footer>
            <n-space align="center">
              <div>最近更新: {{ blog.update_time }}</div>
              <div>发布时间: {{ blog.create_time }}</div>
              <n-button strong secondary type="info" @click="editBlog(blog)">编辑</n-button>
              <n-button strong secondary type="error" @click="editBlog(blog)">删除</n-button>
            </n-space>
          </template>
        </n-card>

      </div>
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

    <n-tab-pane name="yyy" tab="222">222</n-tab-pane>
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

const categoryOptions = ref([])
const blogsList = ref([])

onMounted(() => {
  loadBlogs()
  loadcategorys()
})

const loadBlogs = async () => {
  let res = await axios.get("blog/search")
  console.log("11111", res.data.data.rows)
  let datas = res.data.data.rows
  for (let data of datas) {
    // data.content += "..."
    data.update_time = moment(data.update_time).format('YYYY-MM-DD HH:mm')
    data.create_time = moment(data.create_time).format('YYYY-MM-DD HH:mm')
  }
  blogsList.value = datas
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

</script>

<style lang="scss" scoped>

</style>