<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">我的订单</x-header>
		<Scroller height="-48" lock-x  @on-scroll="onScroll" ref="orderListScroller" v-model="status" :pullup-config="pullUp" 
			@on-pullup-loading="pullupRefresh" :use-pullup=true @on-scroll-bottom="onScrollBottom">
		  <div style="padding-bottom: 5px;">	
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
            _this.$vux.loading.show({
                text: '正在加载'
            });
            ++_this.pageNo;
            setTimeout(function() {
                _this.$vux.loading.hide();
                for (let i = 1; i <= 10; i++) {
					let o = {};
					let c = {};
					c.logo = 'http://ove4dmu8g.bkt.clouddn.com/dianpu.jpg';
					c.name = '店铺';
                    o.company = c;
                    o.createDate = '2017-8-11 17:27:03';
					o.statusName = '已支付';
					o.fee = '116.00';
					let olist = [];
					let ol1 = {};
					let p1 = {};
					p1.name = '商品1';
					ol1.product = p1;
					ol1.rebate = '58';
					ol1.num = '1';
					olist.push(ol1);

					let ol2 = {};
					let p2 = {};
					p2.name = '商品2';
					ol2.product = p2;
					ol2.rebate = '58';
					ol2.num = '1';
					olist.push(ol2);
					o.orderList = olist;

					let de = {};
					de.name = '张三';
					de.phone = '18088883333';
					de.address = 'xxx省xxx市xxx区xxx街道xxxx';
					o.deliveryAddress = de;

                    _this.orders.push(o);
                }
                _this.$nextTick(() => {
                    let sc = _this.$refs.orderListScroller;
                    sc.reset();
                });
                _this.status.pullupStatus = 'enabled';
            }, 1000);
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
		},
		toCancel(item){
		}
	}
}
</script>

<style>
</style>