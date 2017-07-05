<template>
	<div>
		<msg :title="title" :description="desc" :buttons="buttons" :icon="icon"></msg>
	</div>
</template>

<script>
import Msg from 'vux/src/components/msg/index.vue'
import XButton from 'vux/src/components/x-button/index.vue'

import jQ from 'jquery'
import wx from 'wx'

export default {
	components: {
	    Msg,
	    XButton
	},
	data(){
		return{
			title:'支付提示',
			icon:'info',
			desc:'',
			buttons: [{
		        type: 'primary',
		        text: '立即使用微信支付',
		        onClick:this.payOrder.bind(this)
		    }, {
		        type: 'warn',
		        text: '充值会员卡，稍后再支付',
		        onClick:this.rechargeVip.bind(this)
		    }],
		    price:'',
		    vipFee:'',
		    orderId:''
		}
	},
	created(){
		this.vipFee = this.$route.query.vipFee || 0;
		this.price = this.$route.query.price || 0;
		this.orderId = this.$route.query.orderId || '';
		this.desc = '您的会员卡余额不足，请选择以下操作<h4>订单金额</h4><h4>会员卡支付价格：￥'+this.vipFee+'</h4><h4>微信支付价格：￥'+this.price+'</h4>'
	},
	methods:{
		payOrder(){
			let _this = this;
			jQ.ajax({
				url:_this.COM.urls.cartsPayByWX,
				data:{'fee':_this.price,'orderId':_this.orderId},
				type:'post',
				success:function(response){
					_this.$vux.loading.hide();
					if(response.code > 0){
						let jo = response.data;
						wx.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: jo.appId, // 必填，公众号的唯一标识
							timestamp: jo.timestamp, // 必填，生成签名的时间戳
							nonceStr: jo.nonceStr, // 必填，生成签名的随机串
							signature: jo.signature,// 必填，签名
							jsApiList: ['chooseWXPay']
						});
						wx.ready(function () {
							// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后
							wx.chooseWXPay({
								timestamp: jo.timestamp, // 支付签名时间戳 注意这里的s 文档新版大写 但是我的小写才好使
								nonceStr: jo.nonceStr, // 支付签名随机串
								package: 'prepay_id='+jo.prepay_id, // 统一支付接口返回的package包
								signType: "MD5", // 签名方式，'MD5'
								paySign: jo.paySign, // 支付签名
								success: function (resp) {
									if(resp.errMsg == "chooseWXPay:ok" ) {
										_this.$router.push('/home')
									} else {
				
									}
								},
								cancel:function(resp){
								}
							});
						});
					}else{
						_this.$vux.alert.show({
							content:response.msg
						});
					}
				},
				error:function(response){
					_this.COM.errorCallBack(response,_this.$vux);
				}
			});
		},
		rechargeVip(){
			this.$router.push({path:'/recharge',query:{'fromType':'orderPay','orderId':this.orderId,'fee':this.vipFee,'price':this.price}});
		}
	}
}
</script>

<style>
</style>