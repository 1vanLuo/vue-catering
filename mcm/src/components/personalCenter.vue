<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">个人中心</x-header>
		<div class="own-pc__avatarbox" ref="avt">
			<div class="own-pc__portrait">
				<i class="iconfont icon-gerenzhongxin"></i>
			</div>
			<div class="own-pc__name" @click.prevent="isLogin()">{{userName}}</div>
		</div>
		<Scroller lock-x @on-scroll="onScroll" ref="pcScroller">
			<group >
		      <cell title="我的订单" is-link link="/orders">
		      	<i slot="icon" class="iconfont icon-dingdan" style="display:block;margin-right:5px;font-size: 1.1rem;color:#007aff"></i>
		      </cell>
		      <cell title="我的优惠券" is-link link="/coupons">
		      	<i slot="icon" class="iconfont icon-youhuiquan1" style="display:block;margin-right:5px;font-size: 1.2rem;color:#ffc636"></i>
		      </cell>
		      <cell title="会员信息" is-link>
		      	<i slot="icon" class="iconfont icon-huiyuanxinxi" style="display:block;margin-right:5px;font-size: 1.2rem;color:#c568f5"></i>
		      </cell>
		      <cell title="会员充值" is-link link="/recharge">
		      	<i slot="icon" class="iconfont icon-chongzhi" style="display:block;margin-right:5px;font-size: 1.2rem;color:#3ac2db"></i>
		      </cell>
		      <!--<cell title="个人信息" is-link>
		      	<i slot="icon" class="iconfont icon-gerenxinxi" style="display:block;margin-right:5px;font-size: 1.2rem;color:#3cc51f"></i>
		      </cell>-->
		      <cell title="设置" is-link link="/setting">
		      	<i slot="icon" class="iconfont icon-shezhi" style="display:block;margin-right:5px;font-size: 1.2rem;color:#f56a00"></i>
		      </cell>
		    </group>
	    </Scroller>
	</div>
</template>

<script>
//import {XHeader, Group, Cell, CellBox, Scroller} from 'vux'
import XHeader from 'vux/src/components/x-header'
import Scroller from 'vux/src/components/scroller'
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'
import CellBox from 'vux/src/components/cell-box'

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
			userName:'登录/注册           >'
		}
	},
	created(){
	},
	mounted(){
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
	   	  this.$router.push({path:'/loginCaptcha'});
	   },
	   toCharge(){
	   	  this.$router.push({path:'/recharge'});
	   }
	}
}
</script>

<style lang="less">
	
</style>