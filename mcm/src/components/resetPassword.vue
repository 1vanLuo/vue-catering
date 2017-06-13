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
import XHeader from 'vux/src/components/x-header'

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
			
		}
	}
}
</script>

<style>
</style>