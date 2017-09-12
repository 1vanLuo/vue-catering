import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import PersonalCenter from '../components/personalCenter.vue'
import LoginPassword from '../components/loginPassword.vue'
import PreOrder1 from '../components/preOrder1.vue'
import LoginGesture from '../components/loginGesture.vue'
import Orders from '../components/orders.vue'
import OrderView from '../components/orderView.vue'
import Evaluate from '../components/evaluate.vue'
import Setting from '../components/setting.vue'
import Coupons from '../components/coupons.vue'
import ResetPassword from '../components/resetPassword.vue'
import SetGesture from '../components/setGesture.vue'
import Shop from '../components/shop.vue'
import Register from '../components/register.vue'
import DeliverAddress from '../components/deliverAddress.vue'
import EditAddress from '../components/editAddress.vue'
import FeedBack from '../components/feedBack.vue'
import AccountBalance from '../components/accountBalance.vue'

Vue.use(Router)

export default new Router({
  mode:'hash',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
    	path:'/personalCenter',
    	name:'personalCenter',
    	component: PersonalCenter
    },
    {
    	path:'/loginPassword',
    	name:'loginPassword',
    	component: LoginPassword
    },
    {
    	path:'/loginGesture',
    	name:'loginGesture',
    	component: LoginGesture
    },
    {
    	path:'/preOrder1',
    	name:'preOrder1',
    	component: PreOrder1
    },
    {
    	path:'/orders',
    	name:'orders',
    	component: Orders
    },
    {
    	path:'/orderView',
    	name:'orderView',
    	component: OrderView
    },
    {
    	path:'/evaluate',
    	name:'evaluate',
    	component: Evaluate
    },
    {
    	path:'/setting',
    	name:'setting',
    	component: Setting
    },
    {
    	path:'/coupons',
    	name:'coupons',
    	component: Coupons
    },
    {
    	path:'/resetPassword',
    	name:'resetPassword',
    	component: ResetPassword
    },
    {
    	path:'/setGesture',
    	name:'setGesture',
    	component: SetGesture
    },
    {
    	path:'/shop',
    	name:'shop',
    	component: Shop
    },
    {
    	path:'/register',
    	name:'register',
    	component: Register
    },
    {
    	path:'/deliverAddress',
    	name:'deliverAddress',
    	component: DeliverAddress
    },
    {
    	path:'/editAddress',
    	name:'editAddress',
    	component: EditAddress
    },
    {
    	path:'/feedBack',
    	name:'feedBack',
    	component: FeedBack
    },
    {
    	path:'/accountBalance',
    	name:'accountBalance',
    	component: AccountBalance
    }
  ]
})
