<template>
	<div >
		<x-header :left-options="{backText: ''}" ref="hb">手势密码登录</x-header>
		<div id="outer" ref="ges">
			<div id="element" ref="ges">
			</div>
		</div>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header/index.vue'


export default{
	components:{
		XHeader
	},
	data(){
		return{
			openId:''
		}
	},
	created(){
		this.openId = window.localStorage.getItem('openId') || '';
	},
	mounted(){
		this.initH5lock();
	},
	methods:{
		initH5lock(){
			let _this = this;
			var opt = {
			  chooseType: 3, 
			  width: 300, 
			  height: 300,
			  container: 'element', 
			  outer: 'outer',
			  inputEnd: function(psw){
			  	console.log(psw)
			  	lock.reset();
			  	_this.$vux.loading.show({
				   text: '正在登陆'
				});
			  	let data = {
			  		openid:_this.openId,
			  		pwd:psw,
			  		memberType:1,
			  		mobileType:1,
			  		gesturePassword:true
			  	}
			  } 
			}
			var lock = new H5lock(opt);
			lock.init();
		}
	}
}
</script>

<style>
</style>