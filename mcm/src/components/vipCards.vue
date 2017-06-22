<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">我的会员卡</x-header>
		<Scroller lock-x @on-scroll="onScroll" ref="cardsScroller" v-model="status" :pullup-config="pullUp" 
			@on-pullup-loading="pullupRefresh" :use-pullup=true @on-scroll-bottom="onScrollBottom">
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
import XHeader from 'vux/src/components/x-header/index.vue'
import Scroller from 'vux/src/components/scroller/index.vue'

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
			}]*/
			list:[],
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
				url:_this.COM.urls.getVipCards,
				type:'post',
				data:{'pageNo':_this.pageNo},
				success:function(res){
					_this.$vux.loading.hide();
					if(res.length > 0){
						for(let i of res){
							_this.list.push(i);
						}
						_this.$refs.dataTip.style.display = 'none';
						_this.$nextTick(() => {
							let hbHeight = _this.$refs.hb.$el.offsetHeight;
							let sc = _this.$refs.cardsScroller
							let scHeight = window.innerHeight - hbHeight;
							sc.$el.style.height = scHeight + 'px';
							sc.reset()
						})
						_this.status.pullupStatus = 'default';
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
		toList(item){
			this.$router.push({path:'/vipCardList',query:{'id':item.id,'fee':item.fee}})
		}
	}
}
</script>

<style>
</style>