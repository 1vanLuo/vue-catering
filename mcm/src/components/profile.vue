<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">个人信息</x-header>
		<Scroller lock-x  @on-scroll="onScroll" ref="profileScroller">
			<div>
				<group >
			      <x-input title="登录名" type="text" placeholder="" v-model="userName" readonly></x-input>
			      <x-input title="昵称" type="text" placeholder="" v-model="nickName" readonly></x-input>
			      <x-input title="手机" type="text" placeholder="" v-model="phone" readonly></x-input>
			    </group>
			</div>
		</Scroller>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'
import Scroller from 'vux/src/components/scroller'
import Group from 'vux/src/components/group'
import XInput from 'vux/src/components/x-input'
export default{
	components:{
		XHeader,
		Scroller,
		XInput,
		Group
	},
	data(){
		return{
			userName:'',
			nickName:'',
			phone:''
		}
	},
	created(){
		let userName = this.COM.cookie.get('userName');
		let nickName = this.COM.cookie.get('nickName');
		this.phone = this.COM.cookie.get('phone');
		this.userName = unescape(userName);
		this.nickName = unescape(nickName);
	},
	mounted(){
		this.$nextTick(() => {
			let hbHeight = this.$refs.hb.$el.offsetHeight;
			console.log(hbHeight)
			let sc = this.$refs.profileScroller
			let scHeight = window.innerHeight - hbHeight;
			sc.$el.style.height = scHeight + 'px';
			sc.reset({top: 0})
		})
	},
	methods:{
		onScroll(pos) {
	      this.scrollTop = pos.top
		}
	}
}
</script>

<style>
</style>