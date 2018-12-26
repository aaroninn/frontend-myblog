<template>
<html>
<body>
<div class="login" v-if="this.loginWindow === true">
    <el-form ref="loginForm" :model="loginForm" label-width="50px">
  <el-form-item label="帐号">
    <el-input v-model="loginForm.account"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input type = "password"  v-model="loginForm.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login">登陆</el-button>
    <el-button @click="toRegister">注册</el-button>
  </el-form-item>
</el-form>
</div>
<div class="register" v-if="this.loginWindow === false">
     <el-form ref="registerFormRef" :model="registerForm" label-width="50px" :rules="ruleRegister">
  <el-form-item label="帐号" prop="account">
    <el-input v-model="registerForm.account"></el-input>
  </el-form-item>
  <el-form-item label="名称" prop="name">
    <el-input v-model="registerForm.name"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type = "password"  v-model="registerForm.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="register('registerFormRef')">注册</el-button>
    <el-button @click="toLogin">登陆</el-button>
  </el-form-item>
</el-form>
</div>
</body>
</html>
</template>

<script>
export default {
  data () {
    return {
      ruleRegister: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账户', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      loginForm: {
        account: '',
        password: ''
      },
      registerForm: {
        account: '',
        name: '',
        password: '',
        email: '',
        description: ''
      },
      loginWindow: true
    }
  },
  methods: {
    login () {
      let data = {
        data: this.loginForm,
        successFun: () => {
          this.$message.success('登录成功!')
          this.$cookie.set('pass', this.$store.state.token, 1)
          this.$cookie.set('userid', this.$store.state.userid, 1)
          this.$router.push({path: '/'})
        },
        failFun: () => {
          this.$message.error('登录失败!')
        }
      }
      this.$store.dispatch('login', data)
    },
    toRegister () {
      this.loginWindow = false
    },
    toLogin () {
      this.loginWindow = true
    },
    register (refName) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          let data = {
            data: this.registerForm,
            successFun: () => {
              this.$message.success('注册成功!')
            },
            failFun: () => {
              this.$message.error('注册失败')
            }
          }
          this.$store.dispatch('register', data)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
.login{
    text-align: auto;
    height: 100%;
    width: 640px;
    margin:100px 50px 150px 500px;
}
.register{
    text-align: auto;
    height: 100%;
    width: 640px;
    margin:100px 50px 150px 500px;
}
</style>
