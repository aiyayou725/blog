<template>
  <n-button style="margin-bottom: 20px;" type="primary" @click="showModal = true">新增分类</n-button>
  
  <n-space vertical>
    <n-table striped>
      <thead>
        <tr>
          <th>编号</th>
          <th>名称</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categoryList">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>
            <n-space>
              <n-button type="info" @click="editCategory(category)">编辑</n-button>
              <n-button type="error" @click="deleteCategory(category)">删除</n-button>
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>
  </n-space>

  <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
    <template #header>
      <div>添加分类</div>
    </template>
    <div>
      <n-input v-model:value="addCategory.name" type="text" placeholder="请输入分类名称" />
    </div>
    <template #action>
      <div>
        <n-space>
          <n-button @click="showModal = false">取消</n-button>
          <n-button type="primary" @click="add">提交</n-button>
        </n-space>
      </div>
    </template>
  </n-modal>

  <n-modal v-model:show="updateModal" preset="dialog" title="Dialog">
    <template #header>
      <div>修改分类</div>
    </template>
    <div>
      <n-input v-model:value="updateCategory.name" type="text" placeholder="请输入分类名称" />
    </div>
    <template #action>
      <div>
        <n-space>
          <n-button @click="updateModal = false">取消</n-button>
          <n-button type="primary" @click="update">提交</n-button>
        </n-space>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue'

const axios = inject("axios")
const message = inject("message")
const dialog = inject("dialog")

const categoryList = ref([])
const showModal = ref(false)
const updateModal = ref(false)
const addCategory = reactive({
  name: ''
})
const updateCategory = reactive({
  id: 0,
  name: ''
})

onMounted(() => {
  loadDatas()
})

const loadDatas = async () => {
  let res = await axios.get("/category/list")
  categoryList.value = res.data.data
  console.log(res.data.data)
}

const add = async () => {
  let res = await axios.post("/category/_token/add", { name: addCategory.name })
  console.log(res.data)
  if (res.data.code == 200) { 
    loadDatas()
    message.success("添加分类成功")
  } else {
    message.error(res.data.msg)
  }
  showModal.value = false
  addCategory.name = ''
}

const editCategory = (category) => {
  updateCategory.id = category.id
  updateCategory.name = category.name
  updateModal.value = true
}

const update = async () => {
  let res = await axios.put("/category/_token/update", { id: updateCategory.id, name: updateCategory.name })
  if (res.data.code == 200) { 
    loadDatas()
    message.success("修改分类成功")
  } else {
    message.error(res.data.msg)
  }
  updateModal.value = false
}

const deleteCategory = async (category) => {
  dialog.warning({
    title: "提示",
    content: `确定要删除分类${category.name}吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      let res = await axios.delete(`/category/_token/delete?id=${category.id}`)
      if (res.data.code == 200) {
        loadDatas()
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

</style>