<template>
	<div >
		<x-header :left-options="{backText: ''}" ref="hb">设置手势密码</x-header>
		<div id="outer" ref="ges">
			<div id="element" ref="ges">
			</div>
		</div>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'
export default{
	components:{
		XHeader
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
				setTimeout(function(){
					_this.$vux.loading.hide()
				},3000)
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