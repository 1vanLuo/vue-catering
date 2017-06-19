<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">我的会员卡</x-header>
		<Scroller lock-x @on-scroll="onScroll" ref="cardsScroller">
			<div style="padding: 10px">
				<div class="own-data_none" ref="dataTip">暂无数据</div>
				<div class="own-vipcard__div" v-for="c in list" @click.stop="toList(c)">
					<div>
						<div class="own-vipcard__com">{{c.companyName}}</div>
						<div class="own-vipcard__type">{{c.type}}</div>
						<div class="clearfix"></div>
					</div>
					<div class="own-vipcard__no"><i class="own-nosymbol"></i>{{c.code}}</div>
					<div class="own-vipcard__fee">余额：{{c.fee}}元</div>
				</div>
			</div>
		</Scroller>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'
import Scroller from 'vux/src/components/scroller'

import jQ from 'jquery'

export default{
	components:{
		XHeader,
		Scroller
	},
	data(){
		return{
			/*list:[{
				id:'253534535',
				companyName:'佳速一分公司',
				code:'9008080',
				type:'会员卡',
				fee:'324'
			},
			{
				companyName:'佳速一分公司',
				code:'9008080',
				type:'会员卡',
				fee:'324'
			},
			{
				companyName:'佳速一分公司',
				code:'9008080',
				type:'会员卡',
				fee:'324'
			},
			{
				companyName:'佳速一分公司',
				code:'9008080',
				type:'会员卡',
				fee:'324'
			},
			{
				companyName:'佳速一分公司',
				code:'9008080',
				type:'会员卡',
				fee:'324'
			},
			{
				companyName:'佳速一分公司',
				code:'9008080',
				type:'会员卡',
				fee:'324'
			}
			,{
				companyName:'佳速一分公司',
				code:'9008080',
				type:'会员卡',
				fee:'324'
			},
			{
				companyName:'佳速一分公司',
				code:'9008080',
				type:'会员卡',
				fee:'324'
			}]*/
			list:[]
		}
	},
	created(){
		let _this = this;
		_this.$vux.loading.show({
			text:'正在加载'
		})
		jQ.ajax({
			url:_this.COM.urls.getVipCards,
			type:'post',
			success:function(res){
				_this.$vux.loading.hide();
				if(res.length > 0){
					_this.list = res;
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
			let sc = this.$refs.cardsScroller
			let scHeight = window.innerHeight - hbHeight;
			sc.$el.style.height = scHeight + 'px';
			sc.reset({top: 0})
		})
	},
	methods:{
		onScroll(pos) {
	      this.scrollTop = pos.top
		},
		toList(item){
			this.$router.push({path:'/vipCardList',query:{'id':item.id,'fee':item.fee}})
		}
	}
}
</script>

<style>
</style>