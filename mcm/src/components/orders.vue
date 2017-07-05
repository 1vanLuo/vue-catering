<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">我的订单</x-header>
		<Scroller lock-x  @on-scroll="onScroll" ref="orderListScroller" v-model="status" :pullup-config="pullUp" 
			@on-pullup-loading="pullupRefresh" :use-pullup=true @on-scroll-bottom="onScrollBottom">
		  <div style="padding-bottom: 5px;">	
		  	<div class="own-data_none" ref="dataTip">暂无数据</div>
			<div v-for="(o,index) in orders" style="padding: 10px;background-color: #fff;margin-bottom: 10px;" @click="toView(o)">
				<div class="own-order__feediv">
					<div>
						<div class="logo"><img :src="o.company.logo"></div>
						<div class="title">
							<div class="ellipsis">{{o.company.name}}</div>
							<div style="font-size: 0.75rem;color: #999;line-height: 1rem;">{{o.createDate}}</div>
						</div>
						<div class="fee">{{o.statusName}}</div>
						<div class="clearfix"></div>
					</div>
				</div>
				<div class="own-order__content">
					<div style="float: left;font-size: 0.9rem;color:#666;margin-left: 13%;">{{o.orderList[0].product.name}}等{{o.orderList.length}}件商品</div>
					<div style="float: right; font-weight: bold;font-size: 0.9rem;">&yen; {{o.fee}}</div>
					<div class="clearfix"></div>
				</div>
				<div class="own-order__btns" >
					<div class="pay" v-if="o.payStatus == 1" @click.stop="toPay(o)">支付订单</div>
					<div class="cancel" v-if="o.status == 401" @click.stop="toCancel(o)">取消订单</div>
					<div class="clearfix"></div>
				</div>
			</div>
		 </div>
		</Scroller>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header/index.vue'
import Scroller from 'vux/src/components/scroller/index.vue'

import jQ from 'jquery'

export default{
	components: {
		XHeader,
		Scroller
	},
	data(){
		return{
			orders:[],
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
		this.$vux.loading.show({
			text:'正在加载'
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
				url:_this.COM.urls.getOrderList,
				data:{'pageNo':_this.pageNo},
				type:'post',
				success:function(res){
					_this.$vux.loading.hide();
					if(res.length > 0){
						for(let i of res){
							let d = _this.COM.formatDate(i.createDate);
							i.createDate = d;
							let logo = i.company.logo || '';
							i.company.logo = _this.COM.imgHost + logo;
							_this.orders.push(i);
							//_this.productName.push(i.orderList[0].product.name);
						}
						console.log(_this.orders)
						_this.$refs.dataTip.style.display = 'none';
						_this.$nextTick(() => {
							let sc = _this.$refs.orderListScroller
							let hbHeight = _this.$refs.hb.$el.offsetHeight;
							let scHeight = window.innerHeight - hbHeight - 5;
							sc.$el.style.height = scHeight + 'px';
							sc.reset();
						});
						_this.status.purllupStatus = 'default';
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
		toView(o){
			window.sessionStorage.setItem('orderView',JSON.stringify(o))
			this.$router.push({path:'/orderView'});
		},
		toPay(item){
			let _this = this;
			_this.$vux.loading.show({text:'正在支付'});
			jQ.ajax({
				url:_this.COM.urls.cartsPayByVip,
				data:{'orderId':item.id,'fee':item.vipPrice,'price':item.wxPrice},
				type:'post',
				success:function(resp){
					_this.$vux.loading.hide();
					if(resp.code < 0){
			  			let data = resp.data;
			  			_this.$router.push({path:'/beforePayOrder',query:{'vipFee':data.vipFee,'price':data.price,'orderId':data.orderId}});
			  		}else{
			  			_this.$vux.alert.show({
							content:res.msg,
							onHide(){
								if(resp.code > 0){
									_this.$router.push('/orders');
									window.sessionStorage.removeItem('cart');
								}else if(resp.code == 0){
									_this.$router.push('/loginCaptcha');
								}
							}
						});
			  		}
				},
				error:function(resp){
					_this.COM.errorCallBack(resp,_this.$vux);
				}
			});
		},
		toCancel(item){
			_this.$vux.loading.show({text:'正在取消订单'});
			jQ.ajax({
				url:_this.COM.urls.cancelOrder,
				data:{'orderId':item.id},
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
	}
}
</script>

<style>
</style>