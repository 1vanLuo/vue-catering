<template>
	<div >
		<span ref="bage" class="own-cart__badge">{{count}}</span>
		<div ref="dot" class="own-cart__dot"></div>
		<x-header :left-options="{backText: ''}" ref="hb">全部菜品<a slot="right"><i class="iconfont icon-fancai" style="color: #fff;font-size: 1.3rem;" ref="dc" @click.prevent="toCart"></i></a></x-header>
		<Scroller lock-x  @on-scroll="onScroll" ref="menuListScroller" v-model="status" :pullup-config="pullUp" 
			@on-pullup-loading="pullupRefresh" :use-pullup=true @on-scroll-bottom="onScrollBottom">
			<div>
				<panel :list="list" :type="type" v-on:on-click-btn="addToCart" v-on:on-click-item="clickItem"></panel>
			</div>
		</Scroller>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header/index.vue'
import Scroller from 'vux/src/components/scroller/index.vue'
import Panel from 'vux/src/components/panel/index.vue'

import jQ from 'jquery'

export default{
	components:{
		XHeader,
		Scroller,
		Panel
	},
	data(){
		return{
			type: '4',
			/*list: [{
		        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
		        title: '孜然牛肉',
		        desc: '上等黄牛肉',
		        price: '30.00',
		        btn: '来 一 份'
		      }],*/
		    list: [],
		    cart: [],
		    count: 0,
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
		})
	},
	mounted(){
	  	let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
		this.cart = cart;
		console.log(this.cart)
		let ct = 0;
		for(let i of this.cart){
			ct += i.value;
		}
		this.count = ct;
		if(this.count > 0){
			this.$refs.bage.style.display = 'block';
		}else{
			this.$refs.bage.style.display = 'none';
		}
		
		this.pullupRefresh();
	},
	methods:{
		pullupRefresh(){
			let _this = this;
			let gId = _this.$route.query.groupId || 0;
			++_this.pageNo;
			
			jQ.ajax({
				url:_this.COM.urls.product,
				type:'post',
				data:{pageNo:_this.pageNo,groupId:gId},
				success:function(response){
					_this.$vux.loading.hide();
					if(response.length > 0){
						for(let i of response){
			        		i.img = _this.COM.imgHost + i.img;
			        		i.num = 1;
			        		_this.list.push(i);
			        	}
			        	_this.$nextTick(() => {
			        		let hbHeight = _this.$refs.hb.$el.offsetHeight;
							let sc = _this.$refs.menuListScroller;
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
		onScrollBottom(){
			if(this.status.pullupStatus == 'disabled'){
				this.$vux.toast.show({
					type:'text',
					text:'没有更多数据了',
					position:'bottom'
				})
			}
		},
		cartSave(c){
	 	  	let _this = this;
	 	  	let para = {};
	 	  	let pr = {};
	 	  	pr.id = c.id;
	 	  	para.productRelease = pr;
	 	  	if(c.hasOwnProperty('cartId')){
	 	  		para.cartId = c.cartId;
	 	  	}
	 	  	para.num = c.num;
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
				  				++item.num;
				  				_this.cart.splice(i,1,item);
				  				f = true;
				  				break;
				  			}
				  		}
	 	  				if(!f){
	 	  					c.cartId = cartId;
	 	  					_this.cart.splice(len,0,c);
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
				  		sessionStorage.setItem('cart',JSON.stringify(_this.cart));
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
		toCart(){
	  		this.$router.push({path:'/cart'});
	  	},
	  	showDot(el){
		  	let fromY = el.getBoundingClientRect().top;
		  	let fromX = el.getBoundingClientRect().left + 10;
		  	let dc = this.$refs.dc;
		  	let endY = dc.getBoundingClientRect().top;
		  	let endX = dc.getBoundingClientRect().left;
		  	let dot = this.$refs.dot;
		  	dot.style.top = fromY + 'px';
		  	dot.style.left = fromX + 'px';
		  	dot.style.display = 'block';
		  	let flag;
		  	let reX = endX - fromX;
		  	let reY = endY - fromY;
		  	clearInterval(flag);
	  		flag = setInterval(function(){
	  			fromY = (reY / 100) + fromY;
	  			fromX = (reX / 100) + fromX;
	  			dot.style.top = fromY + 'px';
	  			dot.style.left = fromX + 'px'
	  			if(fromX >= endX || fromY <= endY){
	  				dot.style.display = 'none';
	  				dot.style.top = '0px';
		  			dot.style.left = '0px';
	  				clearInterval(flag);
	  			}
	  		},6);
		},
		addToCart(item){
		  	let flag = false;
		  	let len = this.cart.length;
		  	let _cart = this.cart;
		  	let _c = {};
		  	for(let index=0; index<len; index++){
		  		console.log(index);
		  		let c = _cart[index];
		  		if(c.id === item.id){
		  			let num = c.num + 1;
		  			_c.cartId = c.cartId;
		  			_c.id = c.id;
		  			_c.num = num;
		  			_c.desc = c.desc;
		  			_c.img = c.img;
		  			_c.name = c.name;
		  			_c.price = c.price;
		  			_c.vipPrice = c.vipPrice;
		  			flag = true;
		  			break;
		  		}
		  	}
		  	if(!flag){
		  		_c.id = item.id;
	  			_c.num = item.num;
	  			_c.img = item.img;
	  			_c.desc = item.desc;
	  			_c.name = item.name;
	  			_c.price = item.price;
	  			_c.vipPrice = item.vipPrice;
		  	}
	  		this.showDot(event.currentTarget);
			this.cartSave(_c);
		},
		clickItem(item){
		  	this.$router.push({path:'/productView',query:{id:item.id}});
		}
	}
}
</script>

<style>
.own-cart__badge{
	height: 0.9rem;
	width: 0.9rem;
	border-radius: 50%;
	background-color: rgb(60,197,31);
	position: fixed;
	top: 0.5rem;
	right: 3%;
	color: #fff;
	font-size:0.7rem;
	line-height:0.8rem;
	text-align: center;
	z-index: 99;
}
</style>