<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">我的优惠券</x-header>
		<button class="own-login__switch" @click.stop="exchange">兑换优惠券</button>
		<Scroller lock-x @on-scroll="onScroll" v-model="status" ref="cpScroller" :pullup-config="pullUp" 
			@on-pullup-loading="pullupRefresh" :use-pullup=true @on-scroll-bottom="onScrollBottom">
		  <div style="padding-bottom: 15px;">
		  	  <div class="own-data_none" ref="dataTip">暂无数据</div>
		      <div class="own-cp__wrapper" v-for="c in list">
		      	<div class="fee">
		      		<div style="height: 2.7rem;line-height:2.7rem;font-weight: bold;color: #FF563C; text-align: center;">
		      			<i style="font-style: normal;font-size: 0.9rem;margin-right:3px;">&yen;</i><i style="font-style: normal;font-size: 1.5rem;">{{c.fee}}</i>
		      		</div>
		      		<div style="height:1rem;line-height:1rem;font-size: 0.75rem;color:#999;text-align: center;">使用说明</div>
		      	</div>
		      	<div class="desc">
		      		<div style="font-size: 1rem;font-weight: bold;line-height: 2.3rem;height: 2.3rem;">{{c.name}}</div>
		      		<div style="font-size: 0.75rem;line-height: 1.3;">满{{c.limit_fee}}元可用</div>
		      		<div style="font-size: 0.75rem;box-sizing: border-box;">有效期：{{c.begin_date}}至{{c.end_date}}</div>
		      	</div>
		      	<div class="clearfix"></div>
		      </div>
	      </div>
		</Scroller>
		<div v-transfer-dom>
	      <x-dialog v-model="showDialogStyle" :hide-on-blur="hob" :dialog-style="{'max-width': '70%', width: '70%', height: '10rem', top:'25%', 'background-color': '#fff'}">
	        <p style="color:#fff;text-align:center;">
	          <input placeholder="请输入兑换码" 
	          	style="border: none;font-size: 0.85rem;width: 70%;text-align: center;line-height: 1.7rem;
	          	border-bottom: 1px solid #ECECEC;" v-model="code"/>
	          <br>
	          <button style="margin-top: 20px;border: none;background-color: #FF563C;color: #fff;
	          	font-size:0.85rem; width: 60%;line-height: 2rem;border-radius: 3px;" @click.stop="exchangeCoupon">兑 换</button>
	          <br>
	          <div style="font-size: 0.75rem;color: #FF563C;" @click.stop="scanExchange">扫码兑换</div>
	        </p>
	      </x-dialog>
	    </div>
	</div>
</template>

<script>
//import {XHeader, Scroller, Group, XDialog, TransferDomDirective as TransferDom} from 'vux'
import XHeader from 'vux/src/components/x-header/index.vue'
import Group from 'vux/src/components/group/index.vue'
import XDialog from 'vux/src/components/x-dialog/index.vue'
import Scroller from 'vux/src/components/scroller/index.vue'
import {TransferDomDirective as TransferDom} from 'vux/src/directives/transfer-dom/index.js'

import wx from 'wx'
import jQ from 'jquery'

export default{
	directives: {
	    TransferDom
	},
	components:{
		XHeader,
		Scroller,
		Group, 
		XDialog
	},
	data(){
		return{
			showDialogStyle:false,
			hob: true,
			list:[],
			code:'',
			pullUp:{
			  content: '',
			  pullUpHeight: 100,
			  height: 40,
			  autoRefresh: false,
			  downContent: '释放后加载',
			  upContent: '上拉加载更多',
			  loadingContent: '加载中...',
			  clsPrefix: 'xs-plugin-pullup-'
			},
			status:{
				pullupStatus:'default'
			},
			pageNo:0
		}
	},
	created(){
		let _this = this;
		_this.$vux.loading.show({
			text:'正在加载'
		})
		let url = window.location.href;
		jQ.ajax({
		  	url:_this.COM.urls.getWxSdk,
		  	type:'post',
		  	data:{'url':url},
			success:function(response){
		        _this.wxSDK = response;
		        wx.config({
				    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: _this.wxSDK.appId, // 必填，公众号的唯一标识
				    timestamp: _this.wxSDK.timestamp, // 必填，生成签名的时间戳
				    nonceStr: _this.wxSDK.noncestr, // 必填，生成签名的随机串
				    signature: _this.wxSDK.signature,// 必填，签名，见附录1
				    jsApiList: ['scanQRCode','getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				wx.ready(function(){
					_this.scanExchange = function(){
						wx.scanQRCode({
						    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
						    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
						    success: function (res) {
								_this.$vux.loading.show({
								   text: '正在兑换'
								});
						    	jQ.ajax({
						    		url:_this.COM.urls.exchangeCoupon,
						    		type:'post',
						    		data:{'code':res.resultStr},
						    		success:function(resp){
						    			_this.$vux.loading.hide();
						    			let rejo = resp;
					    				_this.$vux.alert.show({
									        title: '提示',
									        content: rejo.msg,
									        onShow () {
									        },
									        onHide () {
									          if(rejo.code > 0){
									          	_this.$router.push('/coupons')
									          }
									        }
									    });
						    		},
						    		error:function(res){
						    			_this.COM.errorCallBack(res,_this.$vux);
						    		}
						    	});
							}
						});
					}
				})
		    },
		    error:function(res){
		       _this.COM.errorCallBack(res,_this.$vux);
		    }
	    });
	},
	mounted(){
		this.pullupRefresh();
	},
	methods:{
		pullupRefresh(){
			let _this = this;
			++_this.pageNo;
			jQ.ajax({
				url:_this.COM.urls.getCoupons,
				type:'post',
				data:{'pageNo':_this.pageNo},
				success:function(res){
					_this.$vux.loading.hide();
					if(res.length > 0){
						for(let i of res){
							_this.list.push(i);
						}
						_this.$refs.dataTip.style.display = 'none';
						_this.$nextTick(() => {
							let hbHeight = _this.$refs.hb.$el.offsetHeight;
							let sc = _this.$refs.cpScroller;
							let scHeight = window.innerHeight - hbHeight - 5;
							sc.$el.style.height = scHeight + 'px';
							sc.reset();
						});
						_this.status.pullupStatus = 'default';
					}else{
						_this.$vux.toast.show({
							type:'text',
							text:'已经到底了',
							position:'bottom'
						})
						_this.status.pullupStatus = 'disabled';
					}
					
				},
				error:function(res){
					_this.COM.errorCallBack(res,_this.$vux);
				}
			});
		},
		onScrollBottom(){
			if(this.status.pullupStatus == 'disabled'){
				this.$vux.toast.show({
					type:'text',
					text:'没有更多数据了',
					position:'bottom'
				})
			}
		},
		onScroll(pos) {
	      this.scrollTop = pos.top
	    },
	    exchange(){
	    	this.showDialogStyle = true;
	    },
	    exchangeCoupon(){
	    	let code = this.code;
	    	let _this = this;
	    	if(_this.COM.trimStr(code) == ''){
	    		_this.$vux.toast.show({
	    			type:'warn',
	    			text:'请输入正确的兑换码'
	    		})
	    	}else{
	    		_this.$vux.loading.show({
				   text: '正在兑换'
				});
		    	jQ.ajax({
		    		url:_this.COM.urls.exchangeCoupon,
		    		type:'post',
		    		data:{'code':code},
		    		success:function(res){
		    			_this.$vux.loading.hide();
		    			let rejo = res;
	    				_this.$vux.alert.show({
					        title: '提示',
					        content: rejo.msg,
					        onShow () {
					        },
					        onHide () {
					          if(rejo.code > 0){
					          	_this.$router.push('/coupons')
					          }
					        }
					    });
		    		},
		    		error:function(res){
		    			_this.COM.errorCallBack(res,_this.$vux);
		    		}
		    	});
	    	}
	    },
	    scanExchange(){
	    	
	    }
	    
	}
}
</script>

<style>
</style>