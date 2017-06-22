<template>
	<div >
		<x-header :left-options="{backText: ''}" ref="hb">重置密码</x-header>
		<div class="own-login__form">
			<input type="tel" name="" id="" value="" placeholder="手机号" @keyup="isPhoneNum" maxlength="11"/>
			<input type="password" name="" id="" value="" placeholder="新密码" v-model="newPwd" maxlength="11"/>
			<input type="text" name="" id="" value="" placeholder="验证码" v-model="captcha" ref="yzmInput"/>
			<button disabled="disabled" ref="yzm" @click="sendCaptcha">{{cptTip}}</button>
		</div>
		<button class="own-login__btn" @click.prevent="savePwd" disabled="disabled" style="background-color: rgba(255,86,60,0.7);" ref="btn">确  定</button>
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
				jQ.ajax({
					url:this.COM.urls.valiPhoe,
					type:'post',
					data:{'phone':_this.phone},
					success:function(res){
						if(res.code < 0){
							_this.$vux.alert.show({
								content:res.msg
							})
						}else{
							yzm.removeAttribute('disabled');
							yzm.style.backgroundColor = "#FF563C";
							btn.removeAttribute('disabled');
							btn.style.backgroundColor = "#FF563C";
						}
					},
					error:function(res){
						_this.COM.errorCallBack(res,_this.$vux);
					}
				});
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
	          text: '',
	        });
			this.$http.post(this.COM.urls.sendCaptcha,{'mobile':this.phone},this.COM.postOpt).then(
				function(res){
					this.$vux.loading.hide();
					let jo = res.body;
					if(jo.code > 0){
						this.$vux.toast.show({
				          text: '短信验证码已发送，请注意查收！',
				          onShow () {
				          },
				          onHide () {
				          }
				        });
				        //let el = _event.currentTarget;
				        let el = this.$refs.yzm;
						el.setAttribute('disabled','disabled');
						el.style.backgroundColor = '#ccc';
						let sec = 119;
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
			jQ.ajax({
				url:_this.COM.urls.checkCaptcha,
				type:'post',
				data:{'mcode':_this.captcha,'mobile':_this.phone},
				success:function(res){
					console.log(res)
					let jo = res;
					if(jo.code > 0){
						jQ.ajax({
							url:_this.COM.urls.resetPwd,
							type:'post',
							data:{'openid':_this.openId,'phone':_this.phone,'pwd':_this.newPwd},
							success:function(res){
								_this.$vux.loading.hide();
								let jo = res;
								if(jo.code == 'SUCCESS'){
									_this.$vux.alert.show({
									  title: '提示',
									  content: jo.msg,
									  onShow () {
									  },
									  onHide () {
									  	_this.$router.push('/loginPassword');
									  }
									});
								}else{
									_this.$vux.alert.show({
									  title: '提示',
									  content: jo.msg,
									  onShow () {
									  },
									  onHide () {
									  }
									});
								}
							},
							error:function(res){
								_this.COM.errorCallBack(res,_this.$vux);
							}
						})
					}else{
						_this.$vux.loading.hide();
						_this.$vux.alert.show({
						  title: '提示',
						  content: jo.msg,
						  onShow () {
						  },
						  onHide () {
						  }
						});
					}
				},
				error:function(res){
					_this.COM.errorCallBack(res,_this.$vux);
				}
			})
		}
			
	}
}
</script>

<style>
</style>