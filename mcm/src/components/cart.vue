<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="headBar">购物车</x-header>
		<scroller lock-x @on-scroll="onScroll" ref="cartScroller">
			<div>
				<panel :list="cart" :type="type" v-on:on-click-add="addNum" v-on:on-click-red="subNum"
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
	import XHeader from 'vux/src/components/x-header/index.vue'
	import {Flexbox, FlexboxItem} from 'vux/src/components/flexbox'
	import Panel from 'vux/src/components/panel/index.vue'
	import Scroller from 'vux/src/components/scroller/index.vue'
	import Icon from 'vux/src/components/icon/index.vue'
	
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
			  cart:[],
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
		},
		mounted: function(){
			let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
			console.log(cart)
			this.cart = cart;
			
			for(let item of this.cart) {  
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
		 	  		data:{'cart':JSON.stringify(para)},
		 	  		success:function(res){
		 	  			_this.$vux.loading.hide();
		 	  			if(res.code > 0){
			 	  			let cartId = res.data;
		 	  				let f = false;
		 	  				let len = _this.cart.length;
		 	  				for(let i=0; i<len; i++){
		 	  					let item = _this.cart[i];
					  			if(item.cartId === cartId){
					  				item.num = c.num;
					  				_this.cart.splice(i,1,item);
					  				f = true;
					  				break;
					  			}
					  		}
		 	  				
					  		_this.countSum();
					  		sessionStorage.setItem('cart',JSON.stringify(_this.cart));
		 	  			}
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
			   	for(let item of this.cart) {  
			   		console.log('----item----')
			   		console.log(item)
	   				num += Number(item.num);
	   				fee += Number(item.num*item.price);
				}
			   	this.sumNum = num;
			   	this.sumFee = fee;
		   },
		   addNum(index){
		   		let item = this.cart[index];
		   		item.num++;
		    	item.sum = (item.num * item.price).toFixed(2)
		    	//this.list.splice(index,1,item);
		    	//this.countSum();
		    	this.cartSave(item);
		   },
		   subNum(index){
		   		let item = this.cart[index];
		   		item.num--;
	    		item.sum = (item.num * item.price).toFixed(2);
	    		//this.list.splice(index,1,item);
	    		//this.countSum();
	    		this.cartSave(item);
		   },
		   delItem(index){
		   		this.$vux.loading.show({
		   			text:'正在加载'
		   		})
		   		let _this = this;
		   		let c = _this.cart[index];
		   		jQ.ajax({
		   			url:_this.COM.urls.delCart,
		   			type:'post',
		   			data:{'id':c.cartId},
		   			success:function(res){
		   				_this.$vux.loading.hide();
		   				if(res.code > 0){
		   					_this.cart.splice(index,1);
					   		sessionStorage.setItem('cart',JSON.stringify(_this.cart));
					   		_this.countSum();
		   				}else{
		   					_this.$vux.alert.show({
		   						content:res.msg
		   					})
		   				}
		   			},
		   			error:function(res){
		   				_this.COM.errorCallBack(res,_this.$vux);
		   			}
		   		})
		   		
		   },
		   onScroll(pos) {
		      this.scrollTop = pos.top
		   },
		   goHome(){
		      this.$router.push({path:'/home'});
		   },
		   toPreOrder(){
		   		if(this.cart.length > 0){
		   			sessionStorage.setItem('cart',JSON.stringify(this.cart));
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