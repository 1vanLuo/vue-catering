<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">个人中心</x-header>
		<div class="own-pc__avatarbox" ref="avt">
			<div class="own-pc__portrait" ref="head">
				<i class="iconfont icon-gerenzhongxin"></i>
			</div>
			<div class="own-pc__name" @click.prevent="isLogin()">{{userName}}</div>
		</div>
		<Scroller lock-x @on-scroll="onScroll" ref="pcScroller">
			<group >
		      <cell title="账户余额" is-link link="/accountBalance">
		      	<i slot="icon" class="iconfont icon-zhanghuyue" style="display:block;margin-right:5px;font-size: 1.2rem;color:rgb(60, 197, 31)"></i>
		      </cell>
		      <cell title="我的优惠券" is-link link="/coupons">
		      	<i slot="icon" class="iconfont icon-youhuiquan1" style="display:block;margin-right:5px;font-size: 1.2rem;color:#ffc636"></i>
		      </cell>
		      <cell title="我的订单" is-link link="/orders">
		      	<i slot="icon" class="iconfont icon-dingdan" style="display:block;margin-right:5px;font-size: 1.1rem;color:#007aff"></i>
		      </cell>
			  <cell title="收货地址" is-link link="/deliverAddress">
		      	<i slot="icon" class="iconfont icon-shouhuodizhi" style="display:block;margin-right:5px;font-size: 1.2rem;color:#c568f5"></i>
		      </cell>
		      <!-- <cell title="我的消费记录" is-link link="/consumes">
		      	<i slot="icon" class="iconfont icon-xiaofeimingxi" style="display:block;margin-right:5px;font-size: 1.1rem;color:#e81818"></i>
		      </cell>
		      <cell title="会员卡信息" is-link link="/vipCards">
		      	<i slot="icon" class="iconfont icon-huiyuanxinxi" style="display:block;margin-right:5px;font-size: 1.2rem;color:#c568f5"></i>
		      </cell>
		      <cell title="会员充值" is-link link="/recharge">
		      	<i slot="icon" class="iconfont icon-chongzhi" style="display:block;margin-right:5px;font-size: 1.2rem;color:#3ac2db"></i>
		      </cell>
		      <cell title="推广二维码" is-link link="/toQrCode">
		      	<i slot="icon" class="iconfont icon-erweima1" style="display:block;margin-right:5px;font-size: 1.2rem;color:#3cc51f"></i>
		      </cell>
			  <cell title="客户管理" is-link link="/customerList">
		      	<i slot="icon" class="iconfont icon-kehuguanli" style="display:block;margin-right:5px;font-size: 1.1rem;color:#007aff"></i>
		      </cell> -->
		      <cell title="设置" is-link link="/setting">
		      	<i slot="icon" class="iconfont icon-shezhi" style="display:block;margin-right:5px;font-size: 1.2rem;color:#f56a00"></i>
		      </cell>
		    </group>
	    </Scroller>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header/index.vue'
import Scroller from 'vux/src/components/scroller/index.vue'
import Group from 'vux/src/components/group/index.vue'
import Cell from 'vux/src/components/cell/index.vue'
import CellBox from 'vux/src/components/cell-box/index.vue'

export default{
	components:{
		XHeader,
		Group,
		Cell,
		CellBox,
		Scroller
	},
	data(){
		return{
			userName:'登录/注册           >',
			isLogined:false
		}
	},
	created(){
		let islogin = this.COM.cookie.get('isLogin') || false;
		this.isLogined = islogin;
		console.log(islogin)
		if(islogin){
			let _userName = this.COM.cookie.get('nickName');
			this.userName = unescape(_userName);
			this.isLogin = function(){
				
			}
		}else{
			this.userName = '登录/注册           >';
			this.isLogin = function(){
				this.$router.push({path:'/loginPassword'});
			}
		}
	},
	mounted(){
		console.log(this.isLogined)
		if(this.isLogined){
			let headImg = this.COM.cookie.get('headImg');
			this.$refs.head.innerHTML = '<img src="'+unescape(headImg)+'" width="100%">';
		}
		this.$nextTick(() => {
			let pcScroller = this.$refs.pcScroller;
			let hbHeight = this.$refs.hb.$el.offsetHeight;
			let avtHeight = this.$refs.avt.offsetHeight;
			let scHeight = window.innerHeight - hbHeight - avtHeight;
			pcScroller.$el.style.height = scHeight + 'px';
			pcScroller.reset({top: 0})
		})
	},
	methods:{
	   onScroll(pos) {
	      this.scrollTop = pos.top
	   },
	   isLogin(){
	   	  
	   },
	   toCharge(){
	   	  this.$router.push({path:'/recharge'});
	   },
	   goBack(){
	   	  this.$router.push({path:'/home'});
	   }
	}
}
</script>

<style lang="less">
	
</style>