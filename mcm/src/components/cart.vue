<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="headBar">购物车</x-header>
		<scroller lock-x @on-scroll="onScroll" ref="cartScroller">
			<div>
				<panel :list="list" :type="type" v-on:on-click-add="addNum" v-on:on-click-red="subNum"
					v-on:on-click-del="delItem"></panel>
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
	
	import jQ from 'jquery'
	
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
			/*for(let i=0; i<cart.length; i++){
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
			}*/
			console.log(cart)
			this.list = cart;
		},
		mounted: function(){
			for(let item of this.list) {  
   				this.sumNum += Number(item.num);
   				this.sumFee += Number(item.num*item.price);
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
		watch:{
		  	 list:{
		  	 	  handler(newVal,oldVal){
		  	 	  	if(oldVal.length == newVal.length){
		  	 	  		let flag = true;
		  	 	  		for(let i=0; i<newVal.length; i++){
		  	 	  			console.log(newVal[i].value);console.log(oldVal[i].value)
		  	 	  			if(newVal[i].id != oldVal[i].id || newVal[i].value != oldVal[i].value){
		  	 	  				flag = false;
		  	 	  				break;
		  	 	  			}
		  	 	  		}
		  	 	  		if(!flag){
		  	 	  			this.cartSave(newVal);
		  	 	  		}
		  	 	  	}else{
		  	 	  		this.cartSave(newVal)
		  	 	  	}
		  	 	  },
		  	 	  deep:true
		  	 }
		},
		methods: {
			cartSave(c){
				let _this = this;
				_this.$vux.loading.show({
					text:'加载中'
				})
				let para = {};
		 	  	let pr = {};
		 	  	pr.id = c.id;
		 	  	para.productRelease = pr;
		 	  	para.num = c.num;
		 	  	para.cartId = c.cartId;
		 	  	jQ.ajax({
		 	  		url:_this.COM.urls.cartSave,
		 	  		type:'post',
		 	  		data:{'cart':para},
		 	  		success:function(res){
		 	  			_this.$vux.loading.hide();
		 	  			let cartId = res.data.id;
	 	  				let f = false;
	 	  				for(let i of _this.cart){
				  			if(i.cartId === cartId){
				  				++i.num;
				  				_this.cart.splice(index,1,i);
				  				f = true;
				  				break;
				  			}
				  		}
	 	  				
	 	  				let ct = 0;
				  		for(let i of _this.cart){
				  			ct += i.num;
				  		}
				  		_this.count = ct;
				  		if(_this.count > 0){
				  			_this.$refs.bage.style.display = 'block';
				  		}else{
				  			_this.$refs.bage.style.display = 'none';
				  		}
				  		console.log('=====this.cart=======')
				  		console.log(_this.cart);
				  		_this.countSum();
				  		sessionStorage.setItem('cart',JSON.stringify(_this.cart));
		 	  		},
		 	  		error:function(res){
		 	  			_this.COM.errorCallBack(res,_this.$vux);
		 	  		}
		 	  	})
		  	},
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
			   		console.log('----item----')
			   		console.log(item)
	   				num += Number(item.num);
	   				fee += Number(item.num*item.price);
				}
			   	this.sumNum = num;
			   	this.sumFee = fee;
		   },
		   addNum(index){
		   		let item = this.list[index];
		   		item.num++;
		    	item.sum = (item.num * item.price).toFixed(2)
		    	//this.list.splice(index,1,item);
		    	//this.countSum();
		    	this.cartSave(item);
		   },
		   subNum(index){
		   		let item = this.list[index];
		   		item.num--;
	    		item.sum = (item.num * item.price).toFixed(2);
	    		//this.list.splice(index,1,item);
	    		//this.countSum();
	    		this.cartSave(item);
		   },
		   delItem(index){
		   		this.list.splice(index,1);
		   		this.countSum();
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