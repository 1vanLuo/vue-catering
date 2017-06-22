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
			      <datetime v-model="order.eatingTime" :placeholder="meatTime" :min-year=2017 format="YYYY-MM-DD HH:mm" :title="timeTitle" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="确定" cancel-text="取消"></datetime>
			      <x-input title="餐巾纸(包)" type="number" placeholder="请输入餐巾纸包数" v-model="order.napkins"></x-input>
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
			    <button class="own-login__btn" style="margin-bottom: 20px;" @click.stop="subOrder">确认并提交订单</button>
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
			meatTime:'请输入用餐时间',
			timeTitle:'用餐时间',
			orderList:[],
			order:{
				linkMan:'',
				phone:'',
				people:'',
				eatingTime:'',
				napkins:'',
				balcony:'',
				remark:''
			},
			openId:''
		}
	},
	created(){
		this.order.eatTime = this.COM.getNowDateTime();
		this.orderList = JSON.parse(window.sessionStorage.getItem('cart')) || [];
		console.log(this.orderList)
		this.openId = window.localStorage.getItem("openId") || this.COM.testOpenId;
	},
	mounted(){
	},
	methods:{
		onScroll(pos) {
	      this.scrollTop = pos.top
		},
		subOrder(){
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
			  		_this.$vux.alert.show({
						content:'您的订单已提交',
						onHide(){
							if(res.code > 0){
								_this.$router.push('/home');
							}else if(res.code == 0){
								_this.$router.push('/loginCaptcha');
							}else{
								_this.$router.push('/recharge');
							}
						}
					});
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