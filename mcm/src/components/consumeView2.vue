<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">消费记录</x-header>
		<Scroller lock-x @on-scroll="onScroll" ref="cv2Scroller">
			<div style="padding: 10px;background-color: #fff;">
				<div style="height: 6rem;border-bottom: 1px solid #E9E9E9;line-height: 6rem;font-size: 3rem;text-align: center;
					font-weight: bold;">
					+{{fee}}
				</div>
				<div style="height: 3rem;line-height: 3rem;border-bottom: 1px solid #E9E9E9;font-size:0.9rem;">
					<div style="float: left;width: 30%;color: #b0b0b0;">消费类型</div>
					<div style="float: left;width: 70%;">会员卡充值</div>
					<div class="clearfix"></div>
				</div>
				<div style="height: 3rem;line-height: 3rem;border-bottom: 1px solid #E9E9E9;font-size:0.9rem;">
					<div style="float: left;width: 30%;color: #b0b0b0;">会员卡号</div>
					<div style="float: left;width: 70%;">{{recharge.vip.code}}</div>
					<div class="clearfix"></div>
				</div>
				<div style="height: 3rem;line-height: 3rem;border-bottom: 1px solid #E9E9E9;font-size:0.9rem;">
					<div style="float: left;width: 30%;color: #b0b0b0;">充值金额</div>
					<div style="float: left;width: 70%;">{{fee}}元</div>
					<div class="clearfix"></div>
				</div>
				<div style="height: 3rem;line-height: 3rem;border-bottom: 1px solid #E9E9E9;font-size:0.9rem;">
					<div style="float: left;width: 30%;color: #b0b0b0;">会员卡余额</div>
					<div style="float: left;width: 70%;">{{recharge.vip.fee}}元</div>
					<div class="clearfix"></div>
				</div>
				<div style="height: 3rem;line-height: 3rem;border-bottom: 1px solid #E9E9E9;font-size:0.9rem;">
					<div style="float: left;width: 30%;color: #b0b0b0;">套餐余额</div>
					<div style="float: left;width: 70%;">{{recharge.vip.comboFee}}元</div>
					<div class="clearfix"></div>
				</div>
				<div style="height: 3rem;line-height: 3rem;border-bottom: 1px solid #E9E9E9;font-size:0.9rem;">
					<div style="float: left;width: 30%;color: #b0b0b0;">创建时间</div>
					<div style="float: left;width: 70%;">{{recharge.createDate}}</div>
					<div class="clearfix"></div>
				</div>
				<div style="height: 3rem;line-height: 3rem;border-bottom: 1px solid #E9E9E9;font-size:0.9rem;">
					<div style="float: left;width: 30%;color: #b0b0b0;">备注</div>
					<div style="float: left;width: 70%;">{{recharge.remark}}</div>
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
			recharge:{
				vip:{}
			},
			fee:''
		}
	},
	created(){
		this.$vux.loading.show({
			content:'正在加载'
		})
		this.id = this.$route.query.id;
		this.fee = this.$route.query.fee;
	},
	mounted(){
		let _this = this;
		jQ.ajax({
			url:_this.COM.urls.getRecharge,
			data:{'id':_this.id},
			type:'post',
			success:function(res){
				_this.$vux.loading.hide();
				_this.recharge = res;
				_this.$nextTick(() => {
					let hbHeight = _this.$refs.hb.$el.offsetHeight;
					let sc = _this.$refs.cv2Scroller;
					let scHeight = window.innerHeight - hbHeight - 5;
					sc.$el.style.height = scHeight + 'px';
					sc.reset();
				});
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