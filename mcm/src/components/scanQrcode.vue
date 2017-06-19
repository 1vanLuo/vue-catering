<template>
	<div >
		<x-header :left-options="{backText: ''}" ref="hb">扫一扫</x-header>
    	<div class="own-scan__dishCard">
    		<img v-bind:src="product.img"/>
    		<div class="own-scan__desc" ref="desc" v-html="product.desc"></div>
    		<div class="own-scan__numpicker">
    			<div @click.prevent="add()" class="own-xnumber__btn">+</div>
            	<input ref="num" class="own-xnumber__ipt" readonly="readonly" :value="num" pattern="[0-9]*" type="number" min="1"/>
		        <div @click.prevent="sub()" class="own-xnumber__btn">-</div>
		        <div style="color: #FF563C;float: left;"><i class="own-moneysmbol"></i>{{sumPrice}}</div>
		        <div class="clearfix"></div>
            </div>
            <button style="width:100%;font-size:0.85rem;border:none;height:2.5rem;background-color: #FF563C;
            	color: #fff;border-radius: 0 0 5px 5px;" @click.stop="pay">支 付</button>
    	</div>
	</div>
</template>

<script>
//import {XHeader, XButton} from 'vux'
import XHeader from 'vux/src/components/x-header'
import XButton from 'vux/src/components/x-button'

import wx from 'weixin-js-sdk'
import jQ from 'jquery'

export default{
	components:{
		XHeader,
		XButton
	},
	data(){
		return{
			num: 1,
			price: 0.00,
			product:{
				desc:''
			},
			pid:''
		}
	},
	created(){
		let _this = this;
		_this.pid = _this.$route.query.id;
		_this.$vux.loading.show({
			text:'正在加载'
		})
		jQ.ajax({
			url:_this.COM.urls.productDetail,
			type:'post',
			data:{'pId':_this.pid},
			success:function(response){
				console.log(response);
				_this.$vux.loading.hide();
				if(response.code != undefined && response.code < 0){
					_this.$vux.alert.show({
						content:response.msg
					})
				}else{
					_this.product = response;
			        _this.product.img = _this.COM.imgHost + _this.product.img;
				}
		    },
		    error:function(res){
		        _this.COM.errorCallBack(res,_this.$vux);
		    }
    	})
	},
	computed:{
		sumPrice:function(){
			return this.num * this.product.price;
		}
	},
	methods:{
		add(){
			++this.num;
	    },
	    sub(){
	    	if(this.num > 1){
	    		this.num--;
	    	}
	    },
	    pay(){
	    	let openId = window.localStorage.getItem('openId');
	    	let _this = this;
	    	_this.$vux.loading.show({
	    		text:'正在处理'
	    	})
	    	jQ.ajax({
	    		url:_this.COM.urls.scanPay,
	    		data:{'openId':openId,'prId':_this.pid,'num':_this.num},
	    		success:function(res){
	    			_this.$vux.loading.hide();
	    			if(res.code == 1){
	    				_this.$vux.alert.show({
					        title: '提示',
					        content: res.msg,
					        onShow () {
					        },
					        onHide () {
					          	this.$router.push('/home')
					        }
					    })
	    			}
	    			else if(res.code == 2){
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
								success: function (resp) {
									if(resp.errMsg == "chooseWXPay:ok" ) {
										//alert("你点击了确认");
										_this.$router.push('/home')
									} else {
				
									}
								},
								cancel:function(resp){
								}
							});
						});
	    			}else if(res.code < 0){
	    				_this.$vux.alert.show({
					        title: '提示',
					        content: res.msg,
					        onShow () {
					        },
					        onHide () {
					          if(res.code == -2){
					          	_this.$router.push('/recharge')
					          }
					        }
					    })
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

<style lang="less">
.own-scan__numpicker{
	padding: 0 10px;
	margin-bottom: 10px
}
</style>