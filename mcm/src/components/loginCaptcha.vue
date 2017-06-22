<template>
	<div >
		<x-header :left-options="{backText: '',preventGoBack:true}" v-on:on-click-back="goHome" ref="hb">注  册</x-header>
		<button class="own-login__switch" @click.prevent="toLoginPwd">登录</button>
		<div class="own-login__form">
			<input type="tel" name="" id="" value="" placeholder="手机号" @keyup="isPhoneNum" maxlength="11"/>
			<input type="text" name="" id="" value="" placeholder="验证码" v-model="captcha" ref="yzmInput"/>
			<button disabled="disabled" ref="yzm" @click="sendCaptcha">{{cptTip}}</button>
		</div>
		<!--<p class="own-login__tip">温馨提示：未注册过的手机号，登录时将自动注册</p>-->
		<button class="own-login__btn" @click.prevent="register">注 册</button>
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
			cptTip:'获取验证码',
			openId:'',
			phone: '',
			captcha:''
		}
	},
	created(){
		this.openId = window.localStorage.getItem('openId') || this.COM.testOpenId;
	},
	methods:{
		toLoginPwd(){
			this.$router.push({path:'/loginPassword'});
		},
		goHome(){
			this.$router.push({path:'/home'});
		},
		isPhoneNum(){
			this.phone = event.currentTarget.value;
			let yzm = this.$refs.yzm;
			if(this.phone.length == 11){
				yzm.removeAttribute('disabled');
				yzm.style.backgroundColor = "#FF563C";
			}else{
				yzm.setAttribute('disabled','disabled');
				yzm.style.backgroundColor = "#ccc";
			}
		},
		sendCaptcha(){
			this.$refs.yzmInput.focus();
			let _event = event;
			this.$vux.loading.show({
	          text: '',
	        });
			this.$http.post(this.COM.urls.sendCaptcha,{'mobile':this.phone},this.COM.postOpt).then(
				function(res){
					this.$vux.loading.hide();
					console.log('------------------')
					console.log(res)
					let jo = res.body;
					if(jo.code > 0){
						this.$vux.toast.show({
				          text: '短信验证码已发送，请注意查收！',
				          onShow () {
				          },
				          onHide () {
				          }
				        });
				        let el = this.$refs.yzm;
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
					}else{
						this.$vux.toast.show({
				          text: '验证码发送失败，请稍后再试！',
				          onShow () {
				          },
				          onHide () {
				          }
				        });
					}
				},
				function(res){
					this.COM.errorCallBack(res,this.$vux);
				}
			);
		},
		register(){
			let _this = this;
			if(this.COM.trimStr(this.phone) != ''){
				this.$vux.loading.show({
				   text: '正在验证注册信息'
				});
				this.$http.post(this.COM.urls.checkCaptcha,{'mcode':this.captcha,'mobile':this.phone},this.COM.postOpt).then(
					function(res){
						console.log(res)
						let jo = res.body;
						if(jo.code > 0){
							this.$http.post(this.COM.urls.register,{'openid':this.openId,'account':this.phone,'register_type':1},this.COM.postOpt).then(
								function(res){
									this.$vux.loading.hide();
									let jo = res.body;
									if(jo.code == 2){
										this.$vux.alert.show({
										  title: '提示',
										  content: '您已注册成功，初始密码为:'+jo.data.pwd+'，马上去登录吧！',
										  onShow () {
										  },
										  onHide () {
										  	_this.$router.push('/loginPassword');
										  }
										});
									}else{
										this.$vux.alert.show({
										  title: '提示',
										  content: jo.msg,
										  onShow () {
										  },
										  onHide () {
										  }
										});
									}
								},
								function(res){
									this.COM.errorCallBack(res,this.$vux);
								}
							)
						}else{
							this.$vux.loading.hide();
							this.$vux.alert.show({
							  title: '提示',
							  content: jo.msg,
							  onShow () {
							  },
							  onHide () {
							  }
							});
						}
					},
					function(res){
						this.COM.errorCallBack(res,this.$vux);
					}
				)
			}else{
				this.$vux.alert.show({
				  content: '请填写手机号！',
				})
			}
			
		}
	}
}
</script>

<style>
</style>