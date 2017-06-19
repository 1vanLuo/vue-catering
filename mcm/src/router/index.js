import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import Cart from '../components/cart.vue'
import PersonalCenter from '../components/personalCenter.vue'
import LoginCaptcha from '../components/loginCaptcha.vue'
import LoginPassword from '../components/loginPassword.vue'
import PreOrder from '../components/preOrder.vue'
import LoginGesture from '../components/loginGesture.vue'
import Recharge from '../components/recharge.vue'
import MenuList from '../components/menuList.vue'
import ScanQrcode from '../components/scanQrcode.vue'
import ProductView from '../components/productView.vue'
import Orders from '../components/orders.vue'
import OrderView from '../components/orderView.vue'
import Evaluate from '../components/evaluate.vue'
import Setting from '../components/setting.vue'
import Coupons from '../components/coupons.vue'
import ResetPassword from '../components/resetPassword.vue'
import SetGesture from '../components/setGesture.vue'
import VipCards from '../components/vipCards.vue'
import Profile from '../components/profile.vue'
import ForgetPassword from '../components/forgetPassword.vue'
import VipCardList from '../components/vipCardList.vue'

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
    	path:'/cart',
    	name:'cart',
    	component: Cart
    },
    {
    	path:'/personalCenter',
    	name:'personalCenter',
    	component: PersonalCenter
    },
    {
    	path:'/loginCaptcha',
    	name:'loginCaptcha',
    	component: LoginCaptcha
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
    	path:'/preOrder',
    	name:'preOrder',
    	component: PreOrder
    },
    {
    	path:'/recharge',
    	name:'recharge',
    	component: Recharge
    },
    {
    	path:'/menuList',
    	name:'menuList',
    	component: MenuList
    },
    {
    	path:'/scanQrcode',
    	name:'scanQrcode',
    	component: ScanQrcode
    },
    {
    	path:'/productView',
    	name:'productView',
    	component: ProductView
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
    	path:'/vipCards',
    	name:'vipCards',
    	component: VipCards
    },
    {
    	path:'/profile',
    	name:'profile',
    	component: Profile
    },
    {
    	path:'/forgetPassword',
    	name:'forgetPassword',
    	component: ForgetPassword
    },
    {
    	path:'/vipCardList',
    	name:'vipCardList',
    	component: VipCardList
    }
  ]
})
