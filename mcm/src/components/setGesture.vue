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
import XHeader from 'vux/src/components/x-header/index.vue'


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
			let arr = [];
			var opt = {
			  chooseType: 3, 
			  width: 300, 
			  height: 300,
			  container: 'element', 
			  outer: 'outer',
			  inputEnd: function(psw){
			  	lock.reset();
			  	if(arr.length > 0){
			  		if(psw == arr[0]){
			  			_this.$vux.loading.show({
						   text: '正在保存'
						});
						setTimeout(function() {
							_this.$vux.alert.show({
								content:'保存成功！'
							})
							_this.$vux.loading.hide();
						}, 1000);
			  		}else{
			  			  arr.length = 0;
			  				_this.$vux.toast.show({
			  						type:'warn',
					  		 	  text:'两次输入的手势密码不同，请重新设置！'
					  		});
			  		}
			  	}else{
			  		  if(psw.length < 4){
					  		 _this.$vux.toast.show({
					  		 	  type:'warn',
					  		 	  text:'请连接4个及以上的点'
					  		 });
					  	}else{
					  			arr.push(psw);
					  			_this.$vux.toast.show({
						  		 	  text:'请再次输入刚才的手势密码'
						  		});
					  	}
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