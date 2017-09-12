<template>
	<div>
		<x-header :left-options="{backText: '',preventGoBack:true}" v-on:on-click-back="goBack" ref="hb">设置</x-header>
		<Scroller lock-x height="-45" @on-scroll="onScroll" ref="stScroller">
			<group >
		      <cell title="修改密码" is-link link="/resetPassword">
		      	<i slot="icon" class="iconfont icon-mima" style="display:block;margin-right:5px;font-size: 1.1rem;color:#007aff"></i>
		      </cell>
		      <cell title="设置手势密码" is-link link="/setGesture">
		      	<i slot="icon" class="iconfont icon-shoushimima" style="display:block;margin-right:5px;font-size: 1.2rem;color:#ffc636"></i>
		      </cell>
		      <!-- <cell title="个人信息" is-link link="/profile">
		      	<i slot="icon" class="iconfont icon-gerenxinxi" style="display:block;margin-right:5px;font-size: 1.2rem;color:#3cc51f"></i>
		      </cell> -->
		      <cell title="意见反馈" is-link link="/feedBack">
		      	<i slot="icon" class="iconfont icon-yijianfankui" style="display:block;margin-right:5px;font-size: 1.2rem;color:#f56a00"></i>
		      </cell>
			  <x-switch :title="remindTitle" prevent-default v-model="isRemind" @on-change="doRemind"></x-switch>
		    </group>
		</Scroller>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header/index.vue'
import Scroller from 'vux/src/components/scroller/index.vue'
import Group from 'vux/src/components/group/index.vue'
import Cell from 'vux/src/components/cell/index.vue'
import XSwitch from 'vux/src/components/x-switch/index.vue'


export default{
	components:{
		XHeader,
		Scroller,
		Group, 
		Cell,
		XSwitch
	},
	data(){
		return{
			isRemind:true,
			remindTitle:'通知提醒'
		}
	},
	created(){
		
	},
	mounted(){
		
	},
	methods:{
		onScroll(pos) {
	      this.scrollTop = pos.top
		},
		doRemind(){
			let _this = this;
			_this.$vux.loading.show();
		},
		goBack(){
			this.$router.push('/personalCenter');
		}
	}
}
</script>

<style>
</style>