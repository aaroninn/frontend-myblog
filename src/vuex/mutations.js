export default {
  SETBLOGS (state, data) {
    state.blogs = data
  },
  SETUSER (state, data) {
    state.user = data
    state.userid = data.id
    state.token = data.token
  },
  SETBLOG (state, blog) {
    state.blog = blog
  },
  SETUSERINFO (state, data) {
    state.userid = data.userid
    state.token = data.token
  }
}
