<template>
	<div>
		<button class="own-login__switch" @click.prevent="toEvaluate" style="z-index: 99;font-size:0.875rem;">评价</button>
		<x-header :left-options="{backText: ''}" ref="hb">订单详情</x-header>
		<scroller lock-x height="-45" @on-scroll="onScroll" ref="orderViewScroller">
			<div>
				<group title="联系人信息">
			      <x-input title="姓名" type="text" v-model="order.createUser.name" readonly></x-input>
			      <x-input title="电话" type="text" v-model="order.createUser.phone" readonly></x-input>
			    </group>
			    <group title="用餐信息">
			      <x-input title="人数" type="number" readonly ></x-input>
			      <x-input title="用餐时间" type="text" readonly ></x-input>
			      <x-input title="餐巾纸(包)" type="number" readonly ></x-input>
			      <div class="own-checker__box">
			      	<div class="own-checker__inner">
			      	  <span>包厢</span>
			      	  <checker default-item-class="demo2-item" selected-item-class="demo2-item-selected">
				        <checker-item value="1">是</checker-item>
				        <checker-item value="2">否</checker-item>
				      </checker>
				    </div>
			      </div>
			      <group title="酒水饮料请备注">
				     <x-textarea name="remark" readonly v-model="order.remark"></x-textarea>
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
			          <tr v-for="ol in order.orderLists">
			            <td>{{ol.product.name}}</td>
			            <td>&yen;{{ol.price}}</td>
			            <td>x {{ol.num}}</td>
			          </tr>
			        </tbody>
			      </x-table>
			    </group>
			</div>
		</scroller>
	</div>
</template>

<script>
//import {XHeader, Scroller, Group, XInput, Checker, CheckerItem, XTextarea, XTable, Datetime} from 'vux'
import XHeader from 'vux/src/components/x-header'
import Scroller from 'vux/src/components/scroller'
import Group from 'vux/src/components/group'
import XInput from 'vux/src/components/x-input'
import {Checker,CheckerItem} from 'vux/src/components/checker'
import XTextarea from 'vux/src/components/x-textarea'
import XTable from 'vux/src/components/x-table'
import Datetime from 'vux/src/components/datetime'

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
			order:{},
			meatTime:'请输入用餐时间',
			timeTitle:'用餐时间',
			nowTime:''
		}
	},
	created(){
		let jsonStr = window.sessionStorage.getItem('orderView');
		this.order = JSON.parse(jsonStr);
	},
	mounted(){
	},
	methods:{
		onScroll(pos) {
	      this.scrollTop = pos.top
		},
		toEvaluate(){
			this.$router.push({path:'/evaluate'});
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
</style>