import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import Blog from '@/components/Blog'
import Login from '@/components/Login'
import Index from '@/components/Index'
import CreateBlog from '@/components/CreateBlog'
import EditBlog from '@/components/EditBlog'
// import store from '@/vuex'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/blog',
      name: 'Blog',
      meta: {
        title: '博客内容'
      },
      component: Blog
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        Login: true
      },
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      meta: {
        Login: true
      },
      component: Index
    },
    {
      path: '/createBlog',
      name: 'CreateBlog',
      component: CreateBlog
    },
    {
      path: '/editBlog',
      name: 'EditBlog',
      component: EditBlog
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.Login && !!this.$store.state.token) {
//     return next()
//   }
//   next('/')
// })

// router.afterEach((to, from, next) => {
//   window.scrollTo(0, 0)
// })

export default router
