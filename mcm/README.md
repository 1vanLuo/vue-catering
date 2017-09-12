# mcm

> 这是一个基于Vue.js以及vux框架的移动端web项目，有一套完整的点餐系统页面。集成了vue-router、jQuery（默认试用jQuery的ajax，如果需要axios可以自行安装）、微信的weixin-js-sdk以及百度地图BMap。可以移植到微信公众号开发，也可以移植作为手机app开发。

## Build Setup

``` bash
# install dependencies
npm install

# 初始化项目之后需要把src\components\comp\index.vue覆盖掉node_modules\vux\src\components\panel\index.vue

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
