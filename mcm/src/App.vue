<template>
  <div id="app">
    	<router-view></router-view>
  </div>
</template>

<script>
import jQ from 'jquery'

export default {
  name: 'app',
  created() {
  	const router = this.$router;
  	let openId = window.localStorage.getItem('register') || this.COM.testOpenId;
  	let isReg = window.sessionStorage.getItem('register') || '0';
  	let _this = this;
  	let href = window.location.href;
  	if(isReg == '-99'){
  		router.push('/loginCaptcha');
  	}else{
  		jQ.ajax({
				url:_this.COM.urls.getUser,
				type:'post',
				data:{'openId':openId},
				success:function(res){
					_this.$vux.loading.hide();
					let jo = res;
					_this.COM.cookie.set('userName',escape(jo.username),30);
					_this.COM.cookie.set('nickName',escape(jo.nickname),30);
					_this.COM.cookie.set('phone',jo.mobile,30);
					_this.COM.cookie.set('headImg',escape(jo.headImg),30);
					_this.COM.cookie.set('isLogin',true,30);
					_this.COM.cookie.set('openId',openId);
				  let hrefArr = href.split('/');
				  console.log(hrefArr)
				  let uri = hrefArr[hrefArr.length-1];
				  if(uri != ""){
				  	router.push('/'+uri)
				  }else{
				  	router.push('/home');
				  }
				},
				error:function(res){
					_this.COM.errorCallBack(res,_this.$vux);
				}
			});
  	}
	}
}
</script>

<style lang="less">
@import "../static/css/media_query.css";
@import "../static/css/theme.css";
@import "../static/css/iconfont.css";
body {
  background-color: #F9F9F9;
  margin: 0;
}
</style>
