<template>
	<div style="height: 100%;background-color: #fff;">
		<x-header :left-options="{backText: ''}" ref="hb">会员充值</x-header>
		<divider>选择充值金额</divider>
	    <div class="box">
	      <checker v-model="fee" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
		      <checker-item value="500">500元</checker-item>
		      <checker-item value="1000">1000元</checker-item>
		      <checker-item value="2000">2000元</checker-item>
	      </checker>
	    </div>
	    <input type="number" name="" id="" v-model="iptFee" class="own-recharge__input" placeholder="手动输入充值金额"/>
	    <input type="text" name="" id="" value="" class="own-recharge__input" placeholder="备注" style="color:#888"/>
	    <button class="own-login__btn" style="margin-top: 30px;margin-bottom: 50px;" @click.stop="recharge">微信支付</button>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header/index.vue'
import Divider from 'vux/src/components/divider/index.vue'
import {Checker,CheckerItem} from 'vux/src/components/checker'
import {TransferDomDirective as TransferDom} from 'vux/src/directives/transfer-dom/index.js'

import wx from 'wx'
import jQ from 'jquery'

export default{
	directives: {
	    TransferDom
	},
	components:{
		XHeader,
		Divider,
		Checker,
		CheckerItem
	},
	data(){
		return{
			fee: 0,
			show: false,
			vipNo: '',
			phone: '',
			iptFee: '',
			fromType:'',
			orderId:'',
			vipFee:'',
			price:''
		}
	},
	watch:{
		iptFee:{
			handler(newVal, oldVal){
				if(newVal != ''){
					this.fee = newVal;
				}
			},
			deep: true
		}
	},
	created(){
		this.fromType = this.$route.query.fromType;
		this.orderId = this.$route.query.orderId;
		this.vipFee = this.$route.query.fee;
		this.price = this.$route.query.price;
	},
	methods:{
		recharge(){
		   let isLogin = this.COM.cookie.get('isLogin');
		   let _this = this;
		   if(isLogin){
		   		this.phone = this.COM.cookie.get('phone');
		   		if(this.fee > 0){
			   	  let content = '为手机号'+this.phone+'的会员充值'+this.fee+'元';
			   	  _this.$vux.loading.show({
					   text: '正在为您充值'
					});
					jQ.ajax({
						url:_this.COM.urls.recharge,
						data:{'fee':_this.fee},
						type:'post',
						success:function(res){
							_this.$vux.loading.hide();
							if(res.code > 0){
								let jo = res.data;
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
										success: function (res) {
											if(res.errMsg == "chooseWXPay:ok" ) {
												//alert("你点击了确认");
												if(_this.fromType == 'orderPay'){
													_this.$vux.alert.show({
														content:'充值成功！将自动为你扣除本次订单金额'+_this.vipFee+'元',
														onHide:function(){
															jQ.ajax({
																url:_this.COM.urls.cartsPayByVip,
																data:{'orderId':_this.orderId,'fee':_this.vipFee,'price':_this.price},
																type:'post',
																success:function(resp){
																	_this.$vux.alert.show({
																		content:resp.msg,
																		onHide:function(){
																			_this.$router.push('/orders');
																		}
																	})
																},
																error:function(resp){
																	_this.COM.errorCallBack(resp,_this.$vux);
																}
															});
														}
													});
												}else{
													_this.$router.push('/vipCards');
												}
											} else {
						
											}
										},
										cancel:function(res){
										}
									});
								});
							}else{
								_this.$vux.alert.show({
									content:res.msg
								})
							}
						},
						error:function(res){
							_this.COM.errorCallBack(res,_this.$vux);
						}
					})
			   }else{
			   	    this.$vux.toast.show({
			          text: '请选择或输入充值金额',
			          type: 'warn',
			          onShow () {
			          },
			          onHide () {
			          }
			        })
			   }
		   }else{
		   		this.$vux.alert.show({
		   			title:'提示',
		   			content:'您似乎还没有登录，登陆之后再回来吧！',
		   			onHide(){
		   				_this.$router.push('/loginPassword');
		   			}
		   		})
		   }
		   
		}
	}
}
</script>

<style scoped>
body {
  background-color: #fff !important;
}
.box {
  padding: 0 15px;
}
.demo1-item {
  border: 1px solid #FF563C;
  border-radius: 3px;
  width: 25% !important;
  color: #FF563C;
}
.demo1-item-selected {
	background-color: #FF563C;
	color: #fff;
}
.vux-checker-item{
	height: 2rem;
	text-align: center;
	margin-right: 3%;
	margin-left: 3%;
	line-height: 2rem;
}
</style>