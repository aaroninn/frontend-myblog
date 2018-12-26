<template>
<html>
        <body>
<el-header class="el-menu">
<el-menu
  :default-active="activeIndex"
  mode="horizontal"
  text-color="#989898"
  active-text-color="#989898">
      <el-menu-item v-if="this.$store.state.token === ''" index="1" @click="$router.push('/Login')">登录/注册</el-menu-item>
          <el-menu-item v-else index="1" @click="backMyBlogs">返回我的博客</el-menu-item>
</el-menu>
</el-header>
<div style="margin: 20px 0;"></div>
<el-input
  type="textarea"
  placeholder="请输标题 "
  v-model="editblog.title">
</el-input>
<div style="margin: 20px 0;"></div>
<quill-editor v-model="editblog.content"
                            ref="myQuillEditor"
                            class="editer">
              </quill-editor>
<el-button @click="editBlog()">发布</el-button>
        </body>
    </html>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      editblog: {
        content: '',
        title: '',
        id: ''
      },
      activeIndex: '1'
    }
  },
  created () {
    this.init()
  },
  computed: {
    blog () {
      return this.$store.state.blog
    }
  },
  methods: {
    editBlog () {
      let data = {
        data: this.editblog,
        successFun: () => {
          this.$message.success('修改成功')
        },
        failFun: () => {
          this.$message.error('修改失败')
        }
      }
      this.$store.dispatch('editBlog', data)
    },
    init () {
      this.editblog.content = this.blog.content
      this.editblog.id = this.blog.id
      this.editblog.title = this.blog.title
    },
    backMyBlogs () {
      this.$router.push('/')
      this.$store.dispatch('findBlogsByUser')
    }
  }

}
</script>

<style>
</style>
