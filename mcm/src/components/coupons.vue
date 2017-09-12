<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">我的优惠券</x-header>
		<button class="own-login__switch" @click.stop="exchange">兑换优惠券</button>
		<Scroller height="-48" lock-x @on-scroll="onScroll" v-model="status" ref="cpScroller" :pullup-config="pullUp" 
			@on-pullup-loading="pullupRefresh" :use-pullup=true @on-scroll-bottom="onScrollBottom">
		  <div style="padding-bottom: 15px;">
		      <div class="own-cp__wrapper" v-for="c in list">
		      	<div class="fee">
		      		<div style="height: 2.7rem;line-height:2.7rem;font-weight: bold;color: #FF563C; text-align: center;">
		      			<i style="font-style: normal;font-size: 0.9rem;margin-right:3px;">&yen;</i><i style="font-style: normal;font-size: 1.5rem;">{{c.fee}}</i>
		      		</div>
		      		<div style="height:1rem;line-height:1rem;font-size: 0.75rem;color:#999;text-align: center;">使用说明</div>
		      	</div>
		      	<div class="desc">
		      		<div style="font-size: 1rem;font-weight: bold;line-height: 2.3rem;height: 2.3rem;">{{c.name}}</div>
		      		<div style="font-size: 0.75rem;line-height: 1.3;" v-show="c.limit_fee > 0">满{{c.limit_fee}}元可用</div>
		      		<div style="font-size: 0.75rem;box-sizing: border-box;">有效期：{{c.begin_date}}至{{c.end_date}}</div>
		      	</div>
		      	<div class="clearfix"></div>
		      </div>
	      </div>
		</Scroller>
		<div v-transfer-dom>
	      <x-dialog v-model="showDialogStyle" :hide-on-blur="hob" :dialog-style="{'max-width': '70%', width: '70%', top:'25%', 'background-color': '#fff', padding:'2rem 0'}">
	        <p style="color:#fff;text-align:center;">
	          <input placeholder="请输入兑换码" 
	          	style="border: none;font-size: 0.85rem;width: 70%;text-align: center;line-height: 1.7rem;
	          	border-bottom: 1px solid #ECECEC;" v-model="code"/>
	          <br>
	          <button style="margin-top: 20px;border: none;background-color: #FF563C;color: #fff;
	          	font-size:0.85rem; width: 60%;line-height: 2rem;border-radius: 3px;" @click.stop="exchangeCoupon">兑 换</button>
	        </p>
	      </x-dialog>
	    </div>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header/index.vue'
import Group from 'vux/src/components/group/index.vue'
import XDialog from 'vux/src/components/x-dialog/index.vue'
import Scroller from 'vux/src/components/scroller/index.vue'
import {TransferDomDirective as TransferDom} from 'vux/src/directives/transfer-dom/index.js'


export default{
	directives: {
	    TransferDom
	},
	components:{
		XHeader,
		Scroller,
		Group, 
		XDialog
	},
	data(){
		return{
			showDialogStyle:false,
			hob: true,
			list:[],
			code:'',
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
                    o.name = '优惠券';
                    o.limit_fee = '80';
					o.fee = '20';
					o.begin_date = '2017-01-01';
					o.end_date = '2017-12-31';
                    _this.list.push(o);
                }
                _this.$nextTick(() => {
                    let sc = _this.$refs.cpScroller;
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
	    exchange(){
	    	this.showDialogStyle = true;
	    },
	    exchangeCoupon(){
	    },
	    scanExchange(){
	    	
	    }
	    
	}
}
</script>

<style>
</style>