<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">消费记录</x-header>
		<!--<button class="own-login__switch" @click.stop="asShow=true">{{selection}}</button>-->
		<Scroller lock-x @on-scroll="onScroll" ref="consumeScroller" v-model="status" :pullup-config="pullUp" 
			@on-pullup-loading="pullupRefresh" :use-pullup=true @on-scroll-bottom="onScrollBottom">
		  <div>
		  	<div class="own-data_none" ref="dataTip">暂无数据</div>
			<div style="font-size: 0.75rem;height: 4rem;border-bottom: 1px solid #E5E5E5;" v-for="l in list" @click.stop="toBusinessList(l)">
				<div style="float: left;width: 20%;text-align: center;">
					<div style="margin-top: 0.9rem;">{{l.createDate | parseDate}}</div>
					<div style="">{{l.createDate | parseDay}}</div>
				</div>
				<div style="float: left;width: 20%;text-align: left;line-height: 3.5rem;">
					<i class="iconfont icon-dianpu" style="color: #FF563C;font-size: 2.2rem;"></i>
				</div>
				<div style="float: left;width: 50%;text-align: left;">
					<div style="font-size: 1.5rem;font-weight: bold;margin-top:0.3rem;">{{l.payFee}}</div>
					<div style="font-size: 0.7rem;color: #aaa;">点击查看详情</div>
				</div>
				<div style="float: left;width: 10%;text-align: center;line-height: 4rem;">
					<i class="iconfont icon-qianjin" style="font-size:1rem;color: #aaa;"></i>
				</div>
				<div class="clearfix"></div>
			</div>
		  </div>
		</Scroller>
		<actionsheet v-model="asShow" :menus="months" @on-click-menu="getMonth"></actionsheet>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header/index.vue'
import Scroller from 'vux/src/components/scroller/index.vue'
import Actionsheet from 'vux/src/components/actionsheet/index.vue'

import jQ from 'jquery'

export default{
	components:{
		XHeader,
		Scroller,
		Actionsheet
	},
	data(){
		return{
			list:[],
			asShow:false,
			months:[],
			selection:'筛选',
			pageNo:0,
			endDate:'',
			date:'',
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
			}
		}
	},
	created(){
		this.$vux.loading.show({
			text:'正在加载'
		})
		let d = new Date();
		this.selection = d.getFullYear();
		let all = {};
		let ao = {};
		let eDate = d.getFullYear()+'-'+(d.getMonth()+2)+'-01 00:00:00';
		ao.endDate = eDate;
		this.endDate = eDate;
		d.setMonth(d.getMonth()-5);
		let bDate = d.getFullYear()+'-'+(d.getMonth()+1)+'-01 00:00:00';
		this.date = bDate;
		ao.date = bDate;
		ao.tag = '全部';
		all.label = '全部';
		all.value = ao;
		this.months.push(all);
		for(let i=0; i<6; i++){
			let now = new Date();
			now.setDate(1);
			now.setMonth(now.getMonth() - i);
			console.log(now)
			let m = now.getMonth()+1;
			let o = {};
			o.label = m +'月';
			let value = {};
			value.date = now.getFullYear()+'-'+m+'-01 00:00:00';
			now.setMonth(m);
			value.endDate = now.getFullYear()+'-'+(now.getMonth()+1)+'-01 00:00:00';
			value.tag = m + '月';
			o.value = value;
			this.months.push(o);
		}
	},
	mounted(){
		this.pullupRefresh()
	},
	filters:{
		parseDay(date){
			date = date || ''
			date = date.substring(0,date.indexOf(' '));
			date = date.replace(new RegExp('-',"gm"),'/');
			let day = ['周日','周一','周二','周三','周四','周五','周六'];
			let d = new Date(date);
			return day[d.getDay()];
		},
		parseDate(date){
			date = date || ''
			let d = date.substring(0,date.indexOf(' '));
			return d.substring(5,d.length);
		}
	},
	methods:{
		pullupRefresh(){
			let _this = this;
			++_this.pageNo;
			jQ.ajax({
				url:_this.COM.urls.getConsumes,
				type:'post',
				data:{'pageNo':_this.pageNo,'date':_this.date,'endDate':_this.endDate},
				success:function(res){
					_this.$vux.loading.hide();
					if(res.length > 0){
						for(let i of res){
							_this.list.push(i);
						}
						_this.$refs.dataTip.style.display = 'none';
						_this.$nextTick(() => {
							let hbHeight = _this.$refs.hb.$el.offsetHeight;
							let sc = _this.$refs.consumeScroller;
							let scHeight = window.innerHeight - hbHeight - 5;
							sc.$el.style.height = scHeight + 'px';
							sc.reset();
						});
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
	   onScroll(pos) {
	      this.scrollTop = pos.top
	   },
	   getMonth(key){
	   		console.log(key);
		   	this.selection = key.tag
		   	this.date = key.date;
		   	this.endDate = key.endDate;
		   	this.pageNo = 0;
		   	this.list = [];
		   	this.pullupRefresh();
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
		toBusinessList(item){
			if(item.objectId == 5){
				this.$router.push({path:'/consumeView2',query:{id:item.bizId,fee:item.payFee}});
			}else if(item.objectId == 1){
				this.$router.push({path:'/consumeView',query:{id:item.bizId}});
			}else if(item.objectId == 4){
				let _this = this;
				let busId = '';
				_this.$vux.loading.show({
					text:'加载中'
				})
				jQ.ajax({
					url:_this.COM.urls.getConsumeOrder,
					type:'post',
					data:{'id':item.bizId},
					success:function(res){
						_this.$vux.loading.hide();
						busId = res.id;
						_this.$router.push({path:'/consumeView',query:{id:busId}});
					},
					error:function(res){
						_this.COM.errorCallBack(resp,_this.$vux);
					}
				});
			}
		}
	}
}
</script>

<style>
</style>