<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>

export default {
	name: 'app',
	created() {
		const router = this.$router;
		let href = window.location.href;
		let hrefArr = href.split('/');
		let uri = hrefArr[hrefArr.length - 1];
		if (uri != "") {
			router.push('/' + uri)
		} else {
			router.push('/home');
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
