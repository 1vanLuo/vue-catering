<template>
	<div >
		<x-header :left-options="{backText: '',preventGoBack:true}" v-on:on-click-back="goBack" ref="hb">登  录</x-header>
		<button class="own-login__switch" @click.prevent="toLoginMsg">注册</button>
		<div class="own-login__form">
			<input type="tel" name="" id="" value="" placeholder="手机号" v-model="phone"/>
			<input type="password" name="" id="" value="" placeholder="密码" v-model="pwd"/>
		</div>
		<div style="text-align: right;padding-right: 5px;">
			 <router-link :to="{path:'/forgetPassword'}" class="own-login__gestrue">忘记密码?</router-link>
		</div>
		<button class="own-login__btn" @click.prevent="login">登 录</button>
		<div style="text-align: center;margin-top: 15px;">
			 <router-link :to="{path:'/loginGesture'}" class="own-login__gestrue">手势密码登录</router-link>
		</div>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'
import jQ from 'jquery'
export default{
	components:{
		XHeader
	},
	data(){
		return{
			openId:'',
			phone:'',
			pwd:''
		}
	},
	created(){
		this.openId = window.localStorage.getItem('openId') || this.COM.testOpenId;
	},
	methods:{
		toLoginMsg(){
			this.$router.push({path:'/loginCaptcha'});
		},
		goBack(){
			this.$router.push({path:'/home'});
		},
		login(){
			let _this = this;
			if(_this.COM.trimStr(_this.phone) != ''){
				_this.$vux.loading.show({
				   text: '正在登陆'
				});
				/*_this.$http.post(_this.COM.urls.login,{'openid':_this.openId,'username':_this.phone,'password':_this.pwd,'memberType':1,'mobileType':1,'rememberMe':true},_this.COM.postOpt).then(
					function(res){
						console.log(res)
						_this.$vux.loading.hide();
						let jo = res.body;
						if(typeof jo == 'string' || typeof jo == 'String'){
							jo = JSON.parse(jo);
						}
						if(Number(jo.code) > 0){
							_this.$http.post(_this.COM.urls.getUser,_this.COM.postOpt).then(
								function(res){
									let jo = JSON.parse(res.bodyText)
									_this.COM.cookie.set('userName',jo.username,30);
									_this.COM.cookie.set('nickName',jo.nickname,30);
									_this.COM.cookie.set('phone',jo.mobile,30);
									_this.COM.cookie.set('headImg',jo.headImg,30);
									_this.COM.cookie.set('isLogin',true,30);
									_this.$vux.alert.show({
										content:'登录成功！',
										onHide(){
											_this.$router.push('/home');
										}
									});
								},
								function(res){
									_this.COM.errorCallBack(res,_this.$vux);
								}
							)
						}else{
							_this.$vux.alert.show({
								content:jo.msg,
							});
						}
					},
					function(res){
						_this.COM.errorCallBack(res,this.$vux);
					}
				)*/
				jQ.ajax({
					url:_this.COM.urls.login,
					type:'post',
					data:{'openid':_this.openId,'username':_this.phone,'password':_this.pwd,'memberType':1,'mobileType':1,'rememberMe':true},
					success:function(data){
						console.log(data);
						if(data.code > 0){
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
							_this.$vux.loading.hide();
							_this.$vux.alert.show({
								content:data.msg,
							});
						}
					},
					error:function(res){
						_this.$vux.loading.hide()
						_this.COM.errorCallBack(res,_this.$vux);
						console.log(res)
					}
				})
			}else{
				this.$vux.alert.show({
					content:'请输入手机号'
				})
			}
		}
	}
}
</script>

<style>
</style>