import axios from 'axios'
import { accountServer } from '../config'

// axios.defaults.headers.common['Authorization'] = this.state.token
export default {
  findBlogsByUser ({ commit }) {
    axios({
      method: 'get',
      url: `${accountServer}/blog`
    })
      .then(res => {
        if (res.status === 200) {
          commit('SETBLOGS', res.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },

  findAdminBlog ({ commit }) {
    axios({
      method: 'get',
      url: `${accountServer}/blog/userid/000000`
    })
      .then(res => {
        if (res.status === 200) {
          commit('SETBLOGS', res.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },

  login ({ commit }, data) {
    axios({
      method: 'post',
      url: `${accountServer}/user/login`,
      data: data.data
    })
      .then(res => {
        if (res.status === 200) {
          commit('SETUSER', res.data)
          data.successFun()
        }
      })
      .catch(err => {
        data.failFun()
        console.log(err)
      })
  },

  createComment ({ commit }, data) {
    axios({
      method: 'post',
      url: `${accountServer}/comment`,
      data: data.data
    })
      .then(res => {
        if (res.status === 200) {
          commit('SETBLOG', res.data)
          data.successFun()
        }
      })
      .catch(err => {
        data.failFun()
        console.log(err)
      })
  },

  createBlog ({ commit }, data) {
    axios({
      method: 'post',
      url: `${accountServer}/blog`,
      data: data.data
    })
      .then(res => {
        if (res.status === 200) {
          data.successFun()
        }
      })
      .catch(err => {
        data.failFun()
        console.log(err)
      })
  },

  register ({ commit }, data) {
    axios({
      method: 'post',
      url: `${accountServer}/user/register`,
      data: data.data
    })
      .then(res => {
        if (res.status === 200) {
          data.successFun()
        }
      })
      .catch(err => {
        data.failFun()
        console.log(err)
      })
  },

  deleteBlogByID ({ commit }, data) {
    axios({
      method: 'delete',
      url: `${accountServer}/blog/id/${data.id}`
    })
      .then(res => {
        if (res.status === 200) {
          data.successFun()
        }
      })
      .catch(err => {
        data.failFun()
        console.log(err)
      })
  },

  setUserInfo ({ commit }, data) {
    commit('SETUSERINFO', data)
  },

  updatePassword ({ commit }, data) {
    axios({
      method: 'put',
      url: `${accountServer}/user/password`,
      data: data.data
    })
      .then(res => {
        if (res.status === 200) {
          data.successFun()
        }
      })
      .catch(err => {
        data.failFun()
        console.log(err)
      })
  }
}
