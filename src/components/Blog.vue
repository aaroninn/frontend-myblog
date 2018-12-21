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
          <el-menu-item v-if="this.$store.state.token === ''" index="1" @click="$router.push('/Login')">登录/注册</el-menu-item>
          <el-menu-item v-if="this.$store.state.token !== ''" index="1" @click="backMyBlogs">返回我的博客</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <h1>{{blog.title}}</h1>
        <div v-if="this.$store.state.blogs.length !== 0">
        <Time :time="this.blog.createAt" type="datetime"></Time>
        </div>
        <div class="blogcontent">
          <pre v-html="blog.content"></pre>
        </div>
        <div class="editbutton">
          <el-button v-if="blog.userID === this.$store.state.userid" icon="el-icon-edit" @click="$router.push('/EditBlog')"></el-button>
          <el-button v-if="blog.userID === this.$store.state.userid" icon="el-icon-delete" @click="deleteBlog"></el-button>
        </div>
      </el-main>
      <el-footer>
        <el-input type="textarea" rows="2" placeholder="请输入内容" v-model="comment"></el-input>
        <el-button v-if="this.$store.state.token !== ''" @click="createComment()">发表评论</el-button>
        <el-button v-if="this.$store.state.token === ''" @click="$router.push('/Login')">请先登录注册后再发表评论</el-button>
        <div v-for="comment in blog.comment" :key='comment.content'>
          <div class="comment">
            <pre>{{comment.userName}}:{{comment.content}}</pre>
            <Time :time="comment.createAt" type="datetime"></Time>
          </div>
        </div>
      </el-footer>
    </el-container>
  </body>

  </html>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import {Time} from 'iview'
export default {
  components: {
    VueMarkdown, Time
  },
  data () {
    return {
      comment: '',
      activeIndex: '1'
    }
  },
  created () {
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
          this.$message('create comment success')
          this.comment = ''
        },
        failFun: () => {
          this.$message('create comment fail')
        }
      }
      this.$store.dispatch('createComment', data)
    },
    backMyBlogs () {
      this.$router.push('/')
      this.$store.dispatch('findBlogsByUser')
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
.blogcontent {
  text-align: left;
  margin-top: 20px;
  margin-right: 30px;
  margin-bottom: 30px;
  margin-left: 20px;
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
