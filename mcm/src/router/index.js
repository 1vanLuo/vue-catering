import Vue from 'vue'
import Router from 'vue-router'
import PersonalCenter from '../components/personalCenter.vue'
import Register from '../components/register.vue'
import LoginPassword from '../components/loginPassword.vue'
import LoginGesture from '../components/loginGesture.vue'
import Orders from '../components/orders.vue'
import OrderView from '../components/orderView.vue'
import Evaluate from '../components/evaluate.vue'
import Setting from '../components/setting.vue'
import Coupons from '../components/coupons.vue'
import ResetPassword from '../components/resetPassword.vue'
import SetGesture from '../components/setGesture.vue'
import Home from '../components/home.vue'
import Shop from '../components/shop.vue'
import AccountBalance from '../components/accountBalance.vue'
import DeliverAddress from '../components/deliverAddress.vue'
import EditAddress from '../components/editAddress.vue'
import FeedBack from '../components/feedBack.vue'
import PreOrder1 from '../components/preOrder1.vue'

Vue.use(Router)

export default new Router({
  mode:'hash',
  routes: [
    {
    	path:'/personalCenter',
    	name:'personalCenter',
    	component: PersonalCenter
    },
    {
    	path:'/register',
    	name:'register',
    	component: Register
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
		path:'/home',
    	name:'home',
    	component: Home
	},
	{
		path:'/shop',
    	name:'shop',
    	component: Shop
	},
	{
		path:'/accountBalance',
    	name:'accountBalance',
    	component: AccountBalance
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
		path:'/preOrder1',
    	name:'preOrder1',
    	component: PreOrder1
	}
  ]
})
