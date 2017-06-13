<template>
	<div >
		<x-header :left-options="{backText: '',preventGoBack:true}" v-on:on-click-back="goBack" ref="hb">密码登录</x-header>
		<button class="own-login__switch" @click.prevent="toLoginMsg">短信登录</button>
		<div class="own-login__form">
			<input type="tel" name="" id="" value="" placeholder="手机号"/>
			<input type="password" name="" id="" value="" placeholder="密码"/>
		</div>
		<button class="own-login__btn" @click.prevent="login">登 录</button>
		<div style="text-align: center;margin-top: 15px;">
			 <router-link :to="{path:'/loginGesture'}" class="own-login__gestrue">手势密码登录</router-link>
		</div>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'
export default{
	components:{
		XHeader
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