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
import CityData3 from 'CityData3'
import ToastPlugin from 'vux/src/plugins/toast/index.js'
import ConfirmPlugin from 'vux/src/plugins/confirm/index.js'
import LoadingPlugin from 'vux/src/plugins/loading/index.js'
import AlertPlugin from 'vux/src/plugins/alert/index.js'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)

Vue.prototype.COM = Com;
Vue.prototype.CityData3 = CityData3;

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')

router.beforeEach((to, from, next) => {
	console.log(to.fullPath);
	if(to.fullPath == '' || to.fullPath == '/'){
		next('/home')
	}else{
		next()
	}
})