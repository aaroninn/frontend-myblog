<template>
<html>
  <head>
  <meta name="google-site-verification" content="rf3FqRdCPE7tq1493dKfeXHrG2lQ-E60nlA1Z2Y7lhw" />
  <meta name="baidu-site-verification" content="duxW7Oi3yS" />
  </head>
  <body>
<el-container>
<el-header class="el-menu">
<el-menu
  :default-active="activeIndex"
  mode="horizontal"
  text-color="#989898"
  active-text-color="#989898">
  <el-menu-item  class="el-menu" v-if="this.$store.state.token === null" index="1" @click="$router.push('/Login')">登录/注册</el-menu-item>
  <el-submenu v-else index="2 ">
    <template slot="title">个人中心</template>
    <el-menu-item class="el-menu" index="2-1" @click="getMyBlogs()">我的博客</el-menu-item>
    <el-menu-item class="el-menu" index="2-3" @click="$router.push('/createBlog')">新的博客</el-menu-item>
    <el-menu-item class="el-menu" index="2-3" @click="showEditPw">修改密码</el-menu-item>
    <el-menu-item class="el-menu" index="2-3" @click="logOut">登出</el-menu-item>
    </el-submenu>
</el-menu>
</el-header>
<el-main>
<el-row v-for = "(blog, index) in blogs" :key="index">
<el-button  @click="getBlogByIndex(index)" type="text">
    <font class="fonttitle" size="3" face="Verdana" color="black">
    {{blog.title}}
    </font>
     <font size="3" face="Verdana" color="black" class="fonttime">
    {{moment(blog.createAt).format("YYYY-MM-DD HH:mm:ss")}}
    </font>
    </el-button>
</el-row>
</el-main>
</el-container>
 <el-dialog
  title="修改密码"
  :visible.sync="showEdit"
  width="30%">
  <el-form :model="updatePassword">
      <el-input placeholder="请输入旧密码" class="dialog" v-model="updatePassword.prePassword" type="password"></el-input>
      <el-input placeholder="请输入新密码" class="dialog" v-model="updatePassword.password" type="password"></el-input>
  </el-form>
      <el-button @click="showEdit = false">取 消</el-button>
      <el-button type="primary" @click="updatePasswordfunc">确 定</el-button>
  </el-dialog>
</body>
</html>
</template>

<script>
export default {
  data () {
    return {
      showEdit: false,
      updatePassword: {
        password: '',
        prePassword: ''
      },
      activeIndex: '1'
    }
  },
  created () {
    if (this.$store.state.token === null) {
      var username = this.$store.state.host
      this.$store.dispatch('findAdminBlog', username)
    } else {
      this.$store.dispatch('findBlogsByUser')
    }
  },
  computed: {
    blogs () {
      return this.$store.state.blogs
    }
  },
  methods: {
    getBlogByIndex (index) {
      let blog = this.blogs[index]
      this.$router.push({path: '/blog' + '/' + blog.id})
    },
    getMyBlogs () {
      this.$store.dispatch('findBlogsByUser')
    },
    showEditPw () {
      this.showEdit = true
    },
    updatePasswordfunc () {
      let data = {
        data: this.updatePassword,
        successFun: () => {
          this.$message.success('修改密码成功!')
          this.updatePassword.password = ''
          this.updatePassword.prePassword = ''
          this.showEdit = false
          this.logOut()
        },
        failFun: () => {
          this.$message.error('修改密码失败!')
          this.updatePassword.password = ''
          this.updatePassword.prePassword = ''
        }
      }
      this.$store.dispatch('updatePassword', data)
    },
    logOut () {
      this.$cookie.delete('pass')
      this.$cookie.delete('userid')
      location.reload()
    },
    findBlogByID () {
      var path = window.location.hash
      var pathname = window.location.pathname
      path = path.split(pathname)
      path = path[path.length - 1]
      this.$store.dispatch('findBlogByID', path)
    }
  }
}
</script>

<style>
font.fonttitle{
  position: fixed;
  text-align: left;
  left: 2%;
  width: auto;
  height: auto;
}
font.fonttime{
  text-align: right;
  position: fixed;
  right:5%;
  height: auto;
  width: auto;
}
.dialog{
  padding: 0% 0% 5% 0%;
}
</style>
