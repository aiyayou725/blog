<template>
  <div>
    <img src="../../assets/aside.jpg" alt="">
    <div class="blog-list">
      <div class="category_tags">
        <n-radio-group v-model:value="pageInfo.categoryId" name="radiobuttongroup1" >
          <n-radio-button v-for="(category, index) in categorties" default-value="all" :value="category.value" :label="category.label" @change="handleCheckedChange" />
        </n-radio-group>
      </div>

      <n-space class="search">
        <n-input v-model:value="pageInfo.keyword" :style="{ width: '500px', height: '42px'}" placeholder="请输入关键字" />
        <n-button type="primary" size="large" ghost @click="loadBlogs(0)"> 搜索 </n-button>
      </n-space>

      <div v-for="(blog, index) in blogListInfo" style="cursor: pointer;">
        <n-card :title="blog.title" class="cards" :style="{ width: '800px', height: '100px'}" @click="toDetail(blog)">
          <!-- {{ blog.content }} -->
          <!-- <n-tag :type="blog.category_type">{{ blog.category_name }}</n-tag> -->
          <n-tag :type=blog.category_type size="small" class="tags">{{ blog.category_name }}</n-tag>
          {{ blog.content }}
          <!-- <div v-html="blog.content"></div> -->
          <template #footer>
            <n-space align="center">
              <div class="label">最近更新：{{ blog.update_time }}</div>
              <div class="label">发布时间：{{ blog.create_time }}</div>
            </n-space>
          </template>
        </n-card>
      </div>

      <n-pagination @update:page="loadBlogs" v-model:page="pageInfo.page" :page-count="pageInfo.pageCount" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import moment from 'moment'
import { useRoute, useRouter} from 'vue-router'

const CATEGORY = [
  {
    name: 'vue',
    type: 'success'
  }, {
    name: 'javascript',
    type: 'default'
  }, {
    name: 'react',
    type: 'info'
  }, {
    name: 'nodejs',
    type: 'warning'
  }, {
    name: '网络',
    type: 'primary'
  }, {
    name: '性能',
    type: 'error'
  }
]

const axios = inject("axios")
const route = useRoute()
const router = useRouter()

const blogListInfo = ref([])
//分页数据
const pageInfo = reactive({
    page: 1,
    pageSize: 3,
    pageCount: 0,
    count: 0,
    keyword: "",
    categoryId:0,
})

const categorties = ref([])

onMounted(async () => {
  await loadCategorys()
  await loadBlogs()
})

const handleCheckedChange = () => {
  loadBlogs(0)
}

//读取博客列表
const loadBlogs = async (page = 0) => {
  if (page != 0) {
    pageInfo.page = page;
  }
  let res = await axios.get(`/blog/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pageSize=${pageInfo.pageSize}&categoryId=${pageInfo.categoryId}`)
  let datas = res.data.data.rows;
  for (let data of datas) {
    let category_list = categorties.value
    for(let i=0; i<category_list.length; i++) {
      if (data.category_id == category_list[i].value) {
        data.category_type = category_list[i].type
        data.category_name = category_list[i].label
      }
    }
    data.update_time = moment(data.update_time).format('YYYY-MM-DD HH:mm:ss')
    data.create_time = moment(data.create_time).format('YYYY-MM-DD HH:mm:ss')
  }
  blogListInfo.value = datas;
  console.log("++++", blogListInfo.value)
  pageInfo.count = res.data.data.count;
  pageInfo.pageCount = Math.ceil(pageInfo.count / pageInfo.pageSize)
}

// 获取分类列表
const loadCategorys = async () => {
  const addType = (item) => {
    for (let i=0; i<CATEGORY.length; i++) {
      if( item.name == (CATEGORY[i].name).toLowerCase() ) {
        return CATEGORY[i].type
      }
    }
    return 'default'
  }

  let res = await axios.get("/category/list")
  categorties.value = res.data.data.map((item) => {
    return {
      label: item.name,
      value: item.id,
      type: addType(item)
    }
  })
  categorties.value.push({label: '全部', value: 0, type: ''})
}

const toDetail = (blog)=>{
  router.push({path:"/detail",query:{id:blog.id}})
}

</script>

<style lang="scss" scoped>
img {
  width: 6%;
  position: fixed;
  left: 5vw;
  bottom: 9vh;
}
.search {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.blog-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  .category_tags {
    margin-bottom: 14px;
  }
}

.cards {
  position: relative;
  margin: 10px 0;
  .tags {
     position: absolute;
     right: 10px;
     top: 10px;
  }
}

.label {
  font-size: 12px;
  color: #a0a0a0;

}

:deep(.n-card-header) {
  padding: 10px 0 0 20px;
}
:deep(.n-card-header .n-card-header__main) {
  color: #333;
  font-weight: 500;

}

:deep(.n-card__content) {
  padding: 0 0 0 20px;
}

:deep(p) {
  margin: 0;
}

:deep(.n-card__footer) {
  padding: 10px 0 10px 20px;
}
 
</style>