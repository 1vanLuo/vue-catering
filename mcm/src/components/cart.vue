<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="headBar">购物车</x-header>
		<scroller lock-x @on-scroll="onScroll" ref="cartScroller">
			<div>
				<panel :list="list" :type="type" v-on:on-click-add="countSum" v-on:on-click-red="countSum"
					v-on:on-click-del="countSum"></panel>
			</div>
	    </scroller>
		<div class="own-cart__bottom" ref="footBar">共<span ref="sumNum">{{sumNum}}</span>道菜&nbsp;&nbsp;
			<span style="color:#ff563c">合计: <i ref="sumFee" class="own-cart__sunfee">{{sumFee}}</i>元</span>
			<button class="own-cart__btn" @click.prevent="toPreOrder()">下单</button>
		</div>
	</div>
</template>

<script>
	//import { XHeader, Flexbox, FlexboxItem, Panel, Scroller,Icon } from 'vux'
	import XHeader from 'vux/src/components/x-header'
	import {Flexbox, FlexboxItem} from 'vux/src/components/flexbox'
	import Panel from 'vux/src/components/panel'
	import Scroller from 'vux/src/components/scroller'
	import Icon from 'vux/src/components/icon'
	
	export default {
		components: {
		    XHeader,
		    Flexbox,
		    FlexboxItem,
		    Panel,
		    Scroller,
		    Icon
		},
		data(){
			return{
			  sessionStorage:window.sessionStorage,
			  scrollHeight:null,
			  list:[],
			  type:'5',
		      footer: {
		        title: '查看更多',
		        url: 'javascript:;'
		      },
		      sumNum: 0,
		      sumFee: 0,
			}
		},
		created(){
			let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
			for(let i=0; i<cart.length; i++){
				let item = cart[i];
				let j = 0;
				let flag = false;
				for(j=0; j<this.list.length; j++){
					if(this.list[j].id === item.id){
						flag = true;
						break;
					}
				}
				if(flag){
					++this.list[j].value;
					this.list[j].sum = this.list[j].value * this.list[j].price;
				}else{
					this.list.push(item);
				}
			}
		},
		mounted: function(){
			for(let item of this.list) {  
   				this.sumNum += Number(item.value);
   				this.sumFee += Number(item.sum);
			}
			
			this.$nextTick(() => {
				let hdBarHeight = this.$refs.headBar.$el.offsetHeight;
				let btBarHeight = this.$refs.footBar.offsetHeight;
				let scHeight = window.innerHeight - hdBarHeight - btBarHeight;
				let sc = this.$refs.cartScroller;
				sc.$el.style.height = scHeight + 'px';
	      		this.$refs.cartScroller.reset({top: 0})
	    	})
		},
		updated: function(){
			
		},
		watch: {
		},
		methods: {
			isEmptyObject(e) {  
			    var t;  
			    for (t in e)  
			        return !1;  
			    return !0  
			},
		   countSum(){
		   		let num = 0;
		   		let fee = 0
			   	for(let item of this.list) {  
	   				num += Number(item.value);
	   				fee += Number(item.sum);
				}
			   	this.sumNum = num;
			   	this.sumFee = fee;
			   	sessionStorage.setItem('cart',JSON.stringify(this.list));
		   },
		   onScroll(pos) {
		      this.scrollTop = pos.top
		   },
		   goHome(){
		      this.$router.push({path:'/home'});
		   },
		   toPreOrder(){
		   		if(this.list.length > 0){
		   			sessionStorage.setItem('cart',JSON.stringify(this.list));
		   	  		this.$router.push({path:'/preOrder'});
		   		}else{
		   			this.$vux.toast.show({
			          text: '您还没有选择任何菜品，再去逛一逛吧',
			          type: 'text',
			          width: '50%',
			          onShow () {
			          },
			          onHide () {
			          }
			        });
		   		}
		   }
		}
	}
</script>

<style lang="less">
	
	.basket{
		margin-top: 10px;
		border-top: 1px solid #E5E5E5;
	}
	.flex-dishpic{
		padding: 5px 0 0 10px;
	}
</style>