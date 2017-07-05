<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">消费记录</x-header>
		<Scroller lock-x @on-scroll="onScroll" ref="cvScroller">
			<div style="padding: 10px;background-color: #fff;">
				<div style="height: 6rem;border-bottom: 1px solid #E9E9E9;line-height: 6rem;font-size: 3rem;text-align: center;
					font-weight: bold;">
					-{{bus.fee}}
				</div>
				<div style="height: 3rem;line-height: 3rem;border-bottom: 1px solid #E9E9E9;font-size:0.9rem;"
					v-for="(bl,index) in bus.businesslists">
					<div style="float: left;width: 30%;color: #b0b0b0;" v-if="index == 0">商品信息</div>
					<div style="float: left;width: 30%;color: #b0b0b0;" v-else></div>
					<div style="float: left;width: 40%;">{{bl.product.name}}</div>
					<div style="float: left;width: 15%;">x{{bl.num}}</div>
					<div style="float: left;width: 15%;">{{bl.rebate}}</div>
					<div class="clearfix"></div>
				</div>
				<div style="height: 3rem;line-height: 3rem;border-bottom: 1px solid #E9E9E9;font-size:0.9rem;"
					v-for="(bl,index) in bus.businesslists">
					<div style="float: left;width: 30%;color: #b0b0b0;">卖家信息</div>
					<div style="float: left;width: 70%;">{{bus.company.name}}</div>
					<div class="clearfix"></div>
				</div>
				<div style="height: 3rem;line-height: 3rem;border-bottom: 1px solid #E9E9E9;font-size:0.9rem;"
					v-for="(bl,index) in bus.businesslists">
					<div style="float: left;width: 30%;color: #b0b0b0;">卖家地址</div>
					<div style="float: left;width: 70%;">{{bus.company.address}}</div>
					<div class="clearfix"></div>
				</div>
				<div style="height: 3rem;line-height: 3rem;border-bottom: 1px solid #E9E9E9;font-size:0.9rem;"
					v-for="(bl,index) in bus.businesslists">
					<div style="float: left;width: 30%;color: #b0b0b0;">会员卡余额</div>
					<div style="float: left;width: 70%;">{{bus.vipFee}}</div>
					<div class="clearfix"></div>
				</div>
				<div style="height: 3rem;line-height: 3rem;border-bottom: 1px solid #E9E9E9;font-size:0.9rem;"
					v-for="(bl,index) in bus.businesslists">
					<div style="float: left;width: 30%;color: #b0b0b0;">套餐余额</div>
					<div style="float: left;width: 70%;">{{bus.vip.comboFee}}</div>
					<div class="clearfix"></div>
				</div>
				<div style="height: 3rem;line-height: 3rem;border-bottom: 1px solid #E9E9E9;font-size:0.9rem;"
					v-for="(bl,index) in bus.businesslists">
					<div style="float: left;width: 30%;color: #b0b0b0;">创建时间</div>
					<div style="float: left;width: 70%;">{{bus.createDate}}</div>
					<div class="clearfix"></div>
				</div>
				<div style="height: 3rem;line-height: 3rem;border-bottom: 1px solid #E9E9E9;font-size:0.9rem;"
					v-for="(bl,index) in bus.businesslists">
					<div style="float: left;width: 30%;color: #b0b0b0;">业务单号</div>
					<div style="float: left;width: 70%;">{{bus.code}}</div>
					<div class="clearfix"></div>
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
	components:{
		XHeader,
		Scroller,
	},
	data(){
		return{
			id:'',
			bus:{}
		}
	},
	created(){
		this.$vux.loading.show({
			content:'正在加载'
		})
		this.id = this.$route.query.id;
	},
	mounted(){
		let _this = this;
		jQ.ajax({
			url:_this.COM.urls.getConsumeOrder,
			data:{'id':_this.id},
			type:'post',
			success:function(res){
				_this.$vux.loading.hide();
				_this.bus = res;
				if(!_this.bus.hasOwnProperty('vip')){
					let vip = {};
					let comboFee = '';
					_this.bus.vip = vip;
					_this.$nextTick(() => {
						let hbHeight = _this.$refs.hb.$el.offsetHeight;
						let sc = _this.$refs.cvScroller;
						let scHeight = window.innerHeight - hbHeight - 5;
						sc.$el.style.height = scHeight + 'px';
						sc.reset();
					});
				}
			},
			error:function(res){
				_this.COM.errorCallBack(res,_this.$vux);
			}
		})
	},
	methods:{
		onScroll(pos) {
	      	this.scrollTop = pos.top
	    }
	}
}
</script>

<style>
</style>