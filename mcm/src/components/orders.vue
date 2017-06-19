<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">我的订单</x-header>
		<Scroller lock-x  @on-scroll="onScroll" ref="orderListScroller">
		  <div style="padding-bottom: 5px;">	
		  	<div class="own-data_none" ref="dataTip">暂无数据</div>
			<div v-for="o in orders" style="padding: 10px;background-color: #fff;margin-bottom: 10px;">
				<div class="own-order__feediv">
					<div>
						<div class="title">订单金额</div>
						<div class="fee">&yen;{{o.fee}}</div>
						<div class="clearfix"></div>
					</div>
					<div style="font-size: 0.75rem;color: #999;">{{o.createDate}}</div>
				</div>
				<div class="own-order__content">
					<div style="float: left;">{{o.orderLists[0].product.name}}等{{o.orderLists.length}}件商品</div>
					<div style="float: right; color: #10AEFF;" @click="toView(o)">查看详情</div>
					<div class="clearfix"></div>
				</div>
			</div>
		 </div>
		</Scroller>
	</div>
</template>

<script>
//import { FormPreview, XHeader, Scroller } from 'vux'
import XHeader from 'vux/src/components/x-header'
import Scroller from 'vux/src/components/scroller'

import jQ from 'jquery'

export default{
	components: {
		XHeader,
		Scroller
	},
	data(){
		return{
			/*orders:[
				{
					id:'123424',
					createDate:'2017-6-11 14:59:55',
					orderLists:[
						{
							product:{
								id:'34353647',
								name:'口味虾',
								price:'60.00'
							},
							price:'60.00',
							num:'1',
							productReleaseId:'87298693543'
							
						}
					],
					fee:'60.00',
					remark:'刚好个过过过过过',
					createUser:{
						id:'32363456',
						name:'张三',
						phone:'43543542'
					}
				}
			]*/
			orders:[]
		}
	},
	created(){
		let _this = this;
		_this.$vux.loading.show({
			text:'正在加载'
		})
		jQ.ajax({
			url:_this.COM.urls.getOrderList,
			data:{'pageNo':1},
			type:'post',
			success:function(res){
				_this.$vux.loading.hide();
				if(res.length > 0){
					_this.orders = res;
					_this.$refs.dataTip.style.display = 'none';
				}
			},
			error:function(res){
				_this.COM.errorCallBack(res,_this.$vux);
			}
		})
	},
	mounted(){
		this.$nextTick(() => {
			let hbHeight = this.$refs.hb.$el.offsetHeight;
			let sc = this.$refs.orderListScroller
			let scHeight = window.innerHeight - hbHeight - 5;
			sc.$el.style.height = scHeight + 'px';
			sc.reset({top:0})
		})
	},
	methods:{
		onScroll(pos) {
	      this.scrollTop = pos.top
		},
		toView(o){
			window.sessionStorage.setItem('orderView',JSON.stringify(o))
			this.$router.push({path:'/orderView'});
		}
	}
}
</script>

<style>
</style>