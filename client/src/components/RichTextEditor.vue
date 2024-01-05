<template>
  <div>
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" 
      style="border-bottom: 1px solid #ccc;"/>
    <Editor :defaultConfig="editorConfig" :mode="mode" v-model="valueHtml" style="height: 400px; overflow-y: hidden;"
      @onCreated="handleCreated" @onChange="handleChange" />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css'
import { ref, inject, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import { Toolbar, Editor } from '@wangeditor/editor-for-vue'

// 编辑器示例，必须用 shallowRef 
const editorRef = shallowRef()
const toolbarConfig = { excludeKeys: ["uploadVideo"]}
const editorConfig = { placeholder: "请输入内容..."}
const mode = ref("default")
const valueHtml = ref("")
const server_url = inject("server_url")
editorConfig.MENU_CONF = {}
editorConfig.MENU_CONF['uploadImage'] = {
  base64LimitSize: 10 * 1024,
  server: server_url + "/upload/rich_editor_upload"
}

editorConfig.MENU_CONF["insertImage"] = {
  parseImageSrc: src => {
    if (src.indexOf("http") != 0) {
      return `${server_url}${src}`
    }
    return src
  }
}

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  }
})

const emit = defineEmits(["update: model-value"])
let initFinished = false

onMounted(() => {
  setTimeout(() => {
    valueHtml.value = props.modelValue
    initFinished = true
  }, 200)
})

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor
}

const handleChange = () => {
  if (initFinished) {
    emit("update: model-value", valueHtml.value)
  }
}
</script>

<style lang="scss" scoped>

</style>