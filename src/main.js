// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './vuex'
import ElementUI from 'element-ui'
import VueMarkdown from 'vue-markdown'
import hljs from 'highlight.js'
import mavonEditor from 'mavon-editor'
import 'highlight.js/styles/googlecode.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'mavon-editor/dist/css/index.css'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import vueCookie from 'vue-cookie'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueMarkdown)
Vue.use(hljs)
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.use(vueCookie)
Vue.prototype.axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
    'vue-markdown': VueMarkdown
  },
  template: '<App/>',
  data () {
    return {
      value: ''
    }
  },
  render: h => h(App)
})
Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
