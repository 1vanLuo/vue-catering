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

import jQ from 'jquery'

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
		this.openId = window.localStorage.getItem('openId') || this.COM.testOpenId;
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
			  		password:psw,
			  		memberType:1,
			  		mobileType:1,
			  		gesturePassword:true
			  	}
			  jQ.ajax({
			  	url:_this.COM.urls.login,
			  	type:'post',
			  	data:data,
			  	success:function(res){
		  			_this.$vux.loading.hide();
					if(res.code > 0){
						jQ.ajax({
							url:_this.COM.urls.getUser,
							type:'post',
							data:{'openId':_this.openId},
							success:function(res){
								_this.$vux.loading.hide();
								let jo = res;
								_this.COM.cookie.set('userName',escape(jo.username),30);
								_this.COM.cookie.set('nickName',escape(jo.nickname),30);
								_this.COM.cookie.set('phone',jo.mobile,30);
								_this.COM.cookie.set('headImg',escape(jo.headImg),30);
								_this.COM.cookie.set('isLogin',true,30);
								_this.$vux.toast.show({
									text:'登录成功！',
									onShow(){
										_this.$router.push('/home');
									}
								});
							},
							error:function(res){
								_this.COM.errorCallBack(res,_this.$vux);
							}
						})
					}else{
						_this.$vux.alert.show({
							content:res.msg
						});
					}
		  		},
			  	error:function(res){
		  			_this.COM.errorCallBack(res,_this.$vux);
		  		}
			  	});
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