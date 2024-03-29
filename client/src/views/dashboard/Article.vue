<template>
  <n-tabs v-model:value="tabValue" justify-content="start" type="line">
      <n-tab-pane name="list" tab="文章列表">
          <div v-for="(blog, index) in blogListInfo" style="margin-bottom:15px">
              <n-card :title="blog.title">
                  <!-- {{ blog.content }} -->
                  <div v-html="blog.content"></div>
                  <template #footer>
                      <n-space align="center">
                          <div class="label">最近更新：{{ blog.update_time }}</div>
                          <div class="label">发布时间：{{ blog.create_time }}</div>
                          <n-button strong secondary size="small" type="info" @click="updateBlog(blog)">编辑</n-button>
                          <n-button strong secondary size="small" type="error" @click="deleteBlog(blog)">删除</n-button>
                      </n-space>
                  </template>
              </n-card>
          </div>
          <n-space justify="center">
              <div class="pagination" @click="toPage(pageNum)" v-for="pageNum in  pageInfo.pageCount">
                  <div :style="'color:' + (pageNum == pageInfo.page ? '#18a058' : '')">{{ pageNum }}</div>
              </div>
          </n-space>
      </n-tab-pane>
      <n-tab-pane name="add" tab="添加文章">
          <n-form>
              <n-form-item label="标题">
                  <n-input v-model:value="addArticle.title" placeholder="请输入标题" />
              </n-form-item>
              <n-form-item label="分类">
                  <n-select v-model:value="addArticle.categoryId" :options="categortyOptions" />
              </n-form-item>
              <n-form-item label="内容">
                  <rich-text-editor v-model="addArticle.content"></rich-text-editor>
              </n-form-item>
              <n-form-item label="">
                  <n-button @click="add">提交</n-button>
              </n-form-item>
          </n-form>

      </n-tab-pane>
      <n-tab-pane name="update" tab="修改">
          <n-form>
              <n-form-item label="标题">
                  <n-input v-model:value="updateArticle.title" placeholder="请输入标题" />
              </n-form-item>
              <n-form-item label="分类">
                  <n-select v-model:value="updateArticle.categoryId" :options="categortyOptions" />
              </n-form-item>
              <n-form-item label="内容">
                  <rich-text-editor v-model="updateArticle.content"></rich-text-editor>
              </n-form-item>
              <n-form-item label="">
                  <n-button @click="update">提交</n-button>
              </n-form-item>
          </n-form>
      </n-tab-pane>
  </n-tabs>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import RichTextEditor from '../../components/RichTextEditor.vue'
import moment from 'moment'

const message = inject("message")
const dialog = inject("dialog")
const axios = inject("axios")


//文章添加数据
const addArticle = reactive({
  categoryId: 0,
  title: "",
  content: "",
})

//文章修改数据
const updateArticle = reactive({
  id: 0,
  categoryId: 0,
  title: "",
  content: "",
})

//分类选项
const categortyOptions = ref([])
const blogListInfo = ref([])
//标签页
const tabValue = ref("list")

//分页数据
const pageInfo = reactive({
  page: 1,
  pageSize: 3,
  pageCount: 0,
  count: 0,
})

onMounted(() => {
  loadBlogs()
  loadCategorys()
})

//读取博客列表
const loadBlogs = async () => {
  let res = await axios.get(`/blog/search?page=${pageInfo.page}&pageSize=${pageInfo.pageSize}`)
  let datas = res.data.data.rows;
  for (let data of datas) {
      data.content += '<span>...</span>'
      data.update_time = moment(data.update_time).format('YYYY-MM-DD HH:mm:ss')
      data.create_time = moment(data.create_time).format('YYYY-MM-DD HH:mm:ss')
  }
  blogListInfo.value = datas;
  pageInfo.count = res.data.data.count;
  pageInfo.pageCount = Math.ceil(pageInfo.count / pageInfo.pageSize)
  console.log(res)
}

//读取分类
const loadCategorys = async () => {
  let res = await axios.get("/category/list")
  categortyOptions.value = res.data.data.map((item) => {
      return {
          label: item.name,
          value: item.id
      }
  })
  console.log(categortyOptions.value)
}

const add = async () => {
  let res = await axios.post("/blog/_token/add", addArticle)
  if (res.data.code == 200) {
      message.success(res.data.msg)
  } else {
      message.error(res.data.msg)
  }
}

const toPage = async (pageNum) => {
  pageInfo.page = pageNum
  loadBlogs()
}

const updateBlog = async (blog) => {
  tabValue.value = "update"
  let res = await axios.get(`/blog/detail?id=${blog.id}`)
  updateArticle.id = blog.id
  updateArticle.title = res.data.data[0].title
  updateArticle.content = res.data.data[0].content
  updateArticle.categoryId = res.data.data[0].category_id
}

const update = async () => {
  let res = await axios.put("/blog/_token/update", updateArticle)
  if (res.data.code == 200) {
      message.success(res.data.msg)
      loadBlogs()
      tabValue.value = "list"
  } else {
      message.error(res.data.msg)
  }
}

const deleteBlog = async (blog) => {
  dialog.warning({
    title: "提示",
    content: `确定要删除吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      let res = await axios.delete(`/blog/_token/delete?id=${blog.id}`)
      if (res.data.code == 200) {
        loadBlogs()
        message.success(res.data.msg)
      } else {
        message.error(res.data.msg)
      }
    },
    onNegativeClick: () => {}
  })
}

</script>

<style lang="scss" scoped>
.pagination {
  font-size: 20px;
}
.label {
  font-size: 12px;
  color: #999;
  margin-right: 10px;
}
</style>