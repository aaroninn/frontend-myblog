<template>
  <html>
  <body>
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu"
          mode="horizontal"
          text-color="#989898"
          active-text-color="#989898">
          <el-menu-item v-if="this.$store.state.token === null" index="1" @click="$router.push('/')">返回主页面</el-menu-item>
          <el-menu-item v-else index="1" @click="backMyBlogs">返回我的博客</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <h1>{{blog.title}}</h1>
          <div>{{moment(blog.createAt).format("YYYY-MM-DD HH:mm:ss")}}</div>
       <pre> <quill-editor v-model="blog.content"
                            ref="myQuillEditor"
                            class="editer"
                            :options="editorOption"
                            style="width: auto; height: auto;">
              </quill-editor> </pre>
        <div class="editbutton">
          <el-button v-if="blog.userID === this.$store.state.userid" icon="el-icon-edit" @click="$router.push('/EditBlog')"></el-button>
          <el-button v-if="blog.userID === this.$store.state.userid" icon="el-icon-delete" @click="deleteBlog"></el-button>
        </div>
      </el-main>
      <el-footer>
        <el-input type="textarea" rows="2" placeholder="请输入内容" v-model="comment"></el-input>
        <el-button v-if="this.$store.state.token !== null" @click="createComment()">发表评论</el-button>
        <el-button v-else @click="$router.push('/Login')">请先登录注册后再发表评论</el-button>
        <div v-for="comment in blog.comment" :key='comment.content'>
          <div class="comment">
            <pre>{{comment.userName}}:{{comment.content}}</pre>
             <div>{{moment(comment.createAt).format("YYYY-MM-DD HH:mm:ss")}}</div>
          </div>
        </div>
      </el-footer>
    </el-container>
  </body>

  </html>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    VueMarkdown, quillEditor
  },
  data () {
    return {
      comment: '',
      activeIndex: '1',
      editorOption: {
        theme: 'bubble',
        modules: {
          toolbar: false
        },
        placeholder: '',
        readOnly: true
      }
    }
  },
  created () {
    var path = window.location.href
    var pathsplit = '/'
    path = path.split(pathsplit)
    path = path[path.length - 1]
    this.$store.state.blog = {}
    this.$store.dispatch('findBlogByID', path)
  },
  computed: {
    blog () {
      return this.$store.state.blog
    }
  },
  methods: {
    createComment () {
      let createComment = {
        blogid: this.blog.id,
        userid: this.$store.state.user.id,
        content: this.comment,
        username: this.$store.state.user.name
      }
      let data = {
        data: createComment,
        successFun: () => {
          this.$message.success('评论成功!')
          this.comment = ''
        },
        failFun: () => {
          this.$message.error('评论失败!')
        }
      }
      this.$store.dispatch('createComment', data)
    },
    backMyBlogs () {
      this.$store.dispatch('findBlogsByUser')
      this.$router.push('/')
    },
    deleteBlog () {
      let data = {
        id: this.blog.id,
        successFun: () => {
          this.$message('删除成功')
        },
        failFun: () => {
          this.$message('删除失败')
        }
      }
      this.$store.dispatch('deleteBlogByID', data)
    }
  }
}
</script>

<style>
.blogcontent  {
  text-align: left;
  outline-color: black;
  word-wrap: break-word;
  word-break: break-all;
  height: auto;
  width: auto;
  white-space: pre-wrap;
}
.blogcontent .ql-syntax {
  text-align: left;
  word-wrap: break-word;
  word-break: break-all;
  height: auto;
  width: auto;
  white-space: pre-wrap;
}
.comment {
  text-align: left;
  margin-top: 20px;
  margin-right: 30px;
  margin-bottom: 30px;
  margin-left: 50px;
}
.editbutton {
  text-align: right;
}
</style>
