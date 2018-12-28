# myblog

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
更新12.26:加入了根据二级域名访问不同用户主页的功能, 但是目前这个小站所有的博客文章的path都是/Blog,不利于分享自己的文章,下一次commit将为每一个文章设定单独的path

更新12:28:加入根据不同文章的path进行访问的特性,同时优化了博客文章的显示效果.

注意, vue-quill-editor3.0.6有bug,无法设置readOnly,建议使用vue-quill-editor@3.0.4
