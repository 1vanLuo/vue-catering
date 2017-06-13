// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index.js'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import H5lock from 'H5lock'
import Com from 'Com'
import {ToastPlugin, ConfirmPlugin, LoadingPlugin} from 'vux'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)

Vue.prototype.COM = Com

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
