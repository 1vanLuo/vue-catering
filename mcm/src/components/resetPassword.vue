<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">修改密码</x-header>
		<div class="own-login__form">
			<input v-model="oPwd" type="password" name="" id="" value="" placeholder="原密码" autocomplete="off"/>
			<input v-model="nPwd" type="password" name="" id="" value="" placeholder="新密码" autocomplete="off"/>
			<input v-model="rPwd" type="password" name="" id="" value="" placeholder="确认新密码" autocomplete="off"/>
		</div>
		<button class="own-login__btn" @click.stop="saveNewPwd">保存</button>
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
			oPwd:"",
			nPwd:"",
			rPwd:""
		}
	},
	methods:{
		saveNewPwd(){
			if(this.COM.trimStr(this.oPwd) == '' || this.COM.trimStr(this.nPwd) == '' || this.COM.trimStr(this.rPwd) == ''){
				this.$vux.toast.show({
					type:'warn',
					text:'您输入的信息不完整，请认真填写！'
				})
				return
			}
			if(this.nPwd != this.rPwd){
				this.$vux.toast.show({
					type:'warn',
					text:'您两次输入的新密码不一致'
				})
				return
			}
			let _this = this;
			_this.$vux.loading.show({
				text:'正在处理'
			})
			jQ.ajax({
				url: _this.COM.urls.updatePass,
				type:'post',
				data:{'newpwd':_this.nPwd,'oldpwd':_this.oPwd},
				success:function(res){
					_this.$vux.loading.hide()
					_this.$vux.alert.show({
						content:res.msg,
						onHide(){
							if(res.code > 0){
								_this.$router.push('/setting');
							}
						}
					})
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