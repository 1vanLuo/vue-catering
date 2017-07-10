<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">完善订单信息</x-header>
		<scroller lock-x height="-44" @on-scroll="onScroll" ref="preOrderScroller">
			<div>
				<group title="联系人信息">
			      <x-input title="姓名" type="text" placeholder="请输入联系人姓名" v-model="order.linkMan"></x-input>
			      <x-input title="电话" type="text" placeholder="请输入联系人电话" v-model="order.phone"></x-input>
			    </group>
			    <group title="用餐信息">
			      <x-input title="人数" type="number" placeholder="请输入用餐人数" v-model="order.people"></x-input>
			      <datetime v-model="order.appointmentTime" :placeholder="meatTime" :min-year=2017 format="YYYY-MM-DD HH:mm" :title="timeTitle" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="确定" cancel-text="取消"></datetime>
			      <x-input title="桌号" type="text" placeholder="请输入桌号" v-model="order.tableNo"></x-input>
			      <div class="own-checker__box">
			      	<div class="own-checker__inner">
			      	  <span>包厢</span>
			      	  <checker v-model="order.balcony" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
				        <checker-item value="1">是</checker-item>
				        <checker-item value="2">否</checker-item>
				      </checker>
				    </div>
			      </div>
			      <group title="酒水饮料请备注">
				     <x-textarea name="remark" placeholder="在这里输入备注..." v-model="order.remark"></x-textarea>
				  </group>
			    </group>
			    <group title="已点菜单">
			      <x-table :cell-bordered="false" style="background-color:#fff;">
			        <thead>
			          <tr>
			            <th>菜名</th>
			            <th>单价</th>
			            <th>数量</th>
			          </tr>
			        </thead>
			        <tbody>
			          <tr v-for="ol in orderList">
			            <td>{{ol.name}}</td>
			            <td>&yen;{{ol.price}}</td>
			            <td>x {{ol.num}}</td>
			          </tr>
			        </tbody>
			      </x-table>
			    </group>
			    <button class="own-login__btn" style="margin-bottom: 20px;" @click.stop="subOrder">确认并支付订单</button>
			</div>
		</scroller>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header/index.vue'
import Scroller from 'vux/src/components/scroller/index.vue'
import Group from 'vux/src/components/group/index.vue'
import XInput from 'vux/src/components/x-input/index.vue'
import {Checker,CheckerItem} from 'vux/src/components/checker'
import XTextarea from 'vux/src/components/x-textarea/index.vue'
import XTable from 'vux/src/components/x-table/index.vue'
import Datetime from 'vux/src/components/datetime/index.vue'

import wx from 'wx'
import jQ from 'jquery'

export default{
	components:{
		XHeader,
		Scroller,
		Group,
		XInput,
		Checker,
		CheckerItem,
		XTextarea,
		XTable,
		Datetime
	},
	data(){
		return{
			meatTime:'请选择用餐时间',
			timeTitle:'用餐时间',
			orderList:[],
			order:{
				linkMan:'',
				phone:'',
				people:'',
				appointmentTime:'',
				tableNo:'',
				balcony:'',
				remark:''
			},
			openId:''
		}
	},
	created(){
		this.order.eatTime = this.COM.formatDate();
		this.orderList = JSON.parse(window.sessionStorage.getItem('cart')) || [];
		console.log(this.orderList);
		this.openId = window.localStorage.getItem("openId") || this.COM.testOpenId;
		this.order.phone = this.COM.cookie.get('phone') || '';
		this.order.tableNo = window.sessionStorage.getItem('tableNo') || '';
	},
	mounted(){
	},
	methods:{
		onScroll(pos) {
	      this.scrollTop = pos.top
		},
		subOrder(){
			  let obj = this.order;
			  /*if(obj.remark == ''){obj.remark='无'}
			  for(let prop in obj){
				 if(prop != 'tableNo' && prop != 'balcony' && obj[prop] != undefined && obj[prop] !=''){
				 	
				 }else{
				 	this.$vux.alert.show({
					    content: '您填写的信息不完整'
					});
				 	return 
				 }
			  }*/
			  if(obj.phone == '' || obj.phone == undefined){
		  		this.$vux.alert.show({
				    content: '手机号必填'
				});
			 	return 
			  }
			  if(obj.linkMan == '' || obj.linkMan == undefined){
		  		this.$vux.alert.show({
				    content: '联系人必填'
				});
			 	return 
			  }
			  if(obj.people == '' || obj.people == undefined){
		  		this.$vux.alert.show({
				    content: '用餐人数必填'
				});
			 	return 
			  }
			  if(obj.appointmentTime == '' || obj.appointmentTime == undefined){
		  		this.$vux.alert.show({
				    content: '用餐时间必填'
				});
			 	return 
			  }
			  
			  let cartIds = [];
			  for(let ol of this.orderList){
			  	cartIds.push(ol.cartId);
			  }
			  this.order.cartId = cartIds;
			  console.log(this.order);
			  this.$vux.loading.show({
			    text: '正在提交订单'
			  });
			  let _this = this;
			  jQ.ajax({
			  	url:_this.COM.urls.saveOrder,
			  	type:'post',
			  	data:{'order':JSON.stringify(_this.order),'openId':_this.openId},
			  	success:function(res){
			  		_this.$vux.loading.hide();
			  		if(res.code < 0){
			  			let data = res.data;
			  			_this.$router.push({path:'/beforePayOrder',query:{'vipFee':data.vipFee,'price':data.price,'orderId':data.orderId}});
						/*_this.$vux.toast.show({
							type:'warn',
							time:2000,
							text:'您的会员卡余额不足，将为您跳转到微信支付'
						})
						window.setTimeout(function(){
							jQ.ajax({
								url:_this.COM.urls.recharge,
								data:{'fee':res.data},
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
						},2000);*/
			  		}else{
			  			_this.$vux.alert.show({
							content:res.msg,
							onHide(){
								if(res.code > 0){
									_this.$router.push('/home');
									window.sessionStorage.removeItem('cart');
								}else if(res.code == 0){
									_this.$router.push('/loginCaptcha');
								}
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
<style scoped>
.demo2-item {
  width: 1.6rem !important;
  height: 1.6rem !important;
  border: 2px solid #ccc;
  display: inline-block;
  border-radius: 50%;
  line-height: 1.2rem;
  text-align: center;
  font-size: 0.75rem;
  box-sizing: border-box;
}
.demo2-item-selected {
  border-color: #FF563C;
  background-color: #FF563C;
  color: #fff;
}
.vux-checker-box{
	position: absolute !important;
	width: 60% !important;
	right: 10% !important;
}
.vux-datetime{
	padding: 0 15px !important;
	font-size: 0.875rem !important;
}
</style>