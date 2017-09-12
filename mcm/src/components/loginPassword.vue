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
import XHeader from 'vux/src/components/x-header/index.vue'
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
		this.openId = window.localStorage.getItem('openId') || '';
	},
	methods:{
		toLoginMsg(){
			this.$router.push({path:'/register'});
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