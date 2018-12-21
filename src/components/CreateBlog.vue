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
          <el-menu-item v-if="this.$store.state.token !== ''" index="1" @click="backMyBlogs">返回我的博客</el-menu-item>
</el-menu>
</el-header>
<div style="margin: 20px 0;"></div>
<el-input
  type="textarea"
  placeholder="请输标题 "
  v-model="blog.title">
</el-input>
<div style="margin: 20px 0;"></div>
<quill-editor v-model="blog.content"
                            ref="myQuillEditor"
                            class="editer">
              </quill-editor>
<el-button @click="createBlog()">发布</el-button>
 <el-dialog
  title="修改密码"
  :visible.sync="showEdit"
  width="30%">
  <el-form :model="updatePassword">
      <el-input placeholder="请输入旧密码" class="dialog" v-model="updatePassword.prePassword"></el-input>
      <el-input placeholder="请输入新密码" class="dialog" v-model="updatePassword.password"></el-input>
  </el-form>
      <el-button @click="showEdit = false">取 消</el-button>
      <el-button type="primary" @click="updatePasswordfunc">确 定</el-button>
  </el-dialog>
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
      title: '',
      content: '',
      blog: {
        title: '',
        content: ''
      },
      updatePassword: {
        password: '',
        prePassword: ''
      },
      showEdit: false,
      activeIndex: '1'
    }
  },
  created () {
  },
  computed: {
    blogs () {
      return this.$store.state.blogs
    },
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    createBlog () {
      const blog = {
        content: this.blog.content,
        title: this.blog.title
      }
      let data = {
        data: blog,
        successFun: () => {
          this.afterCreateBlog()
        },
        failFun: () => {
          this.$message.error('创建失败')
        }
      }
      this.$store.dispatch('createBlog', data)
    },
    afterCreateBlog () {
      this.title = ''
      this.content = ''
    },
    backMyBlogs () {
      this.$router.push('/')
      this.$store.dispatch('findBlogsByUser')
    },
    showEditPw () {
      this.showEdit = true
    },
    updatePasswordfunc () {
      let data = {
        data: this.updatePassword,
        successFun: () => {
          this.$message('修改密码成功')
          this.updatePassword.password = ''
          this.updatePassword.prePassword = ''
          this.showEdit = false
        },
        failFun: () => {
          this.$message('修改密码失败')
          this.updatePassword.password = ''
          this.updatePassword.prePassword = ''
        }
      }
      this.$store.dispatch('updatePassword', data)
    }
  }
}
</script>

<style>
.dialog{
  padding: 0% 0% 5% 0%;
}
</style>
