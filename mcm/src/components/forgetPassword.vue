<template>
	<div >
		<x-header :left-options="{backText: ''}" ref="hb">重置密码</x-header>
		<div class="own-login__form">
			<input type="number" name="" id="" value="" placeholder="手机号" @keyup="isPhoneNum" maxlength="11"/>
			<input type="password" name="" id="" value="" placeholder="新密码" v-model="newPwd" maxlength="11"/>
			<input type="text" name="" id="" value="" placeholder="验证码" v-model="captcha" ref="yzmInput"/>
			<button disabled="disabled" ref="yzm" @click="sendCaptcha">{{cptTip}}</button>
		</div>
		<button class="own-login__btn" @click.prevent="savePwd" disabled="disabled" style="background-color: rgba(255,86,60,0.7);" ref="btn">确  定</button>
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
			captcha:'',
			newPwd:''
		}
	},
	watch:{
	},
	created(){
		this.openId = window.localStorage.getItem('openId');
	},
	methods:{
		isPhoneNum(){
			let _this = this;
			_this.phone = event.currentTarget.value;
			let yzm = _this.$refs.yzm;
			let btn = _this.$refs.btn;
			if(_this.phone.length == 11){
				yzm.removeAttribute('disabled');
				yzm.style.backgroundColor = "rgb(255,86,60)";
				btn.removeAttribute('disabled');
				btn.style.backgroundColor = "rgb(255,86,60)";
			}else{
				yzm.setAttribute('disabled','disabled');
				yzm.style.backgroundColor = "#ccc";
				btn.setAttribute('disabled','disabled');
				btn.style.backgroundColor = "rgba(255,86,60,0.7)";
			}
		},
		sendCaptcha(){
			this.$refs.yzmInput.focus();
			let _event = event;
			this.$vux.loading.show({
	          text: '正在发送验证码',
			});
			let _this = this;
			setTimeout(function() {
				_this.$vux.loading.hide();
				_this.$vux.toast.show({
					text:'验证码已发送，请注意查收'
				})
			}, 1000);
		},
		savePwd(){
			if(this.COM.trimStr(this.newPwd) == ''){
				this.$vux.toast.show({
					type:'warn',
					text:'密码不能为空！'
				})
				return
			}
			if(this.COM.trimStr(this.captcha) == ''){
				this.$vux.toast.show({
					type:'warn',
					text:'验证码不能为空！'
				})
				return
			}
			this.$vux.loading.show({
			   text: '正在处理'
			});
			let _this = this;
			setTimeout(function() {
				_this.$vux.loading.hide();
			}, 1000);
		}
			
	}
}
</script>

<style>
</style>