<template>
	<div >
		<x-header :left-options="{backText: '',preventGoBack:true}" v-on:on-click-back="goHome" ref="hb">登录</x-header>
		<button class="own-login__switch" @click.prevent="toLoginPwd">密码登录</button>
		<div class="own-login__form">
			<input type="tel" name="" id="" value="" placeholder="手机号" @keyup="isPhoneNum" maxlength="11"/>
			<input type="text" name="" id="" value="" placeholder="验证码"/>
			<button disabled="disabled" ref="yzm" @click="sendCaptcha">{{cptTip}}</button>
		</div>
		<p class="own-login__tip">温馨提示：未注册过的手机号，登录时将自动注册</p>
		<button class="own-login__btn" @click.prevent="login">登 录</button>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'
export default{
	components:{
		XHeader
	},
	data(){
		return{
			cptTip:'获取验证码',
			openId:''
		}
	},
	created(){
		let openid = window.sessionStorage.getItem('openId') || '';
		if(openid != ''){
			this.openId = openid;
		}else{
			this.$http.post(this.COM.urls.getOpenId,{responseType:'json',emulateJSON:true}).then(
				function(response){
					console.log(response.body);
				},
				function(response){
					
				}
			)
		}
		
	},
	methods:{
		toLoginPwd(){
			this.$router.push({path:'/loginPassword'});
		},
		goHome(){
			this.$router.push({path:'/home'});
		},
		isPhoneNum(){
			let phone = event.currentTarget.value;
			let yzm = this.$refs.yzm;
			if(phone.length == 11){
				yzm.removeAttribute('disabled');
				yzm.style.backgroundColor = "#FF563C";
			}else{
				yzm.setAttribute('disabled','disabled');
				yzm.style.backgroundColor = "#ccc";
			}
		},
		sendCaptcha(){
			this.$vux.toast.show({
	          text: '验证码已发送',
	          onShow () {
	          },
	          onHide () {
	          }
	        });
			let el = event.currentTarget;
			el.setAttribute('disabled','disabled');
			el.style.backgroundColor = '#ccc';
			let sec = 120;
			let flag = setInterval(function(){
				--sec;
				el.innerHTML = sec + '秒后重新获取';
				if(sec == 0){
					clearInterval(flag);
					el.removeAttribute('disabled');
					el.style.backgroundColor = 'rgb(255, 86, 60)';
					el.innerHTML = '获取验证码'
				}
			},1000)
		},
		login(){
			let _this = this;
			this.$vux.loading.show({
			   text: '正在登陆'
			});
			setTimeout(function(){
				_this.$vux.loading.hide()
			},3000)
		}
	}
}
</script>

<style>
</style>