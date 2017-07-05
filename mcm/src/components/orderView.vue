<template>
	<div>
		<button class="own-login__switch" @click.prevent="toEvaluate" style="z-index: 99;font-size:0.875rem;">评价</button>
		<x-header :left-options="{backText: ''}" ref="hb">订单详情</x-header>
		<scroller lock-x height="-45" @on-scroll="onScroll" ref="orderViewScroller">
			<div>
				<group title="联系人信息">
			      <x-input title="姓名" type="text" v-model="order.linkMan" readonly></x-input>
			      <x-input title="电话" type="text" v-model="order.phone" readonly></x-input>
			    </group>
			    <group title="用餐信息">
			      <x-input title="人数" type="number" readonly v-model="order.people"></x-input>
			      <x-input title="用餐时间" type="text" readonly v-model="order.eatingTime"></x-input>
			     <!-- <x-input title="餐巾纸(包)" type="number" readonly ></x-input>-->
			      <x-input title="包厢" type="text" readonly v-if="order.isBalcony == 1" value="是"></x-input>
			      <x-input title="包厢" type="text" readonly v-if="order.isBalcony == 0" value="否"></x-input>
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
			          <tr v-for="ol in order.orderList">
			            <td>{{ol.product.name}}</td>
			            <td>&yen;{{ol.rebate}}</td>
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
import XHeader from 'vux/src/components/x-header/index.vue'
import Scroller from 'vux/src/components/scroller/index.vue'
import Group from 'vux/src/components/group/index.vue'
import XInput from 'vux/src/components/x-input/index.vue'
import XTextarea from 'vux/src/components/x-textarea/index.vue'
import XTable from 'vux/src/components/x-table/index.vue'
import Datetime from 'vux/src/components/datetime/index.vue'

export default{
	components:{
		XHeader,
		Scroller,
		Group,
		XInput,
		XTextarea,
		XTable,
		Datetime
	},
	data(){
		return{
			order:{
				//eatingTime:1498558140000,
				//isBalcony:0
			}
		}
	},
	created(){
		let jsonStr = window.sessionStorage.getItem('orderView');
		let o = JSON.parse(jsonStr);
		let eatTime = this.COM.formatDate(o.eatingTime);
		o.eatingTime = eatTime;
		this.order = o;
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