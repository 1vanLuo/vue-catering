<template>
	<div >
		<span ref="bage" class="own-cart__badge">{{count}}</span>
		<div ref="dot" class="own-cart__dot"></div>
		<x-header :left-options="{backText: ''}">全部菜品<a slot="right"><i class="iconfont icon-fancai" style="color: #fff;font-size: 1.3rem;" ref="dc" @click.prevent="toCart"></i></a></x-header>
		<Scroller lock-x height="-44" @on-scroll="onScroll" ref="menuListScroller">
			<div>
				<panel :list="list" :type="type" v-on:on-click-btn="addToCart" v-on:on-click-item="clickItem"></panel>
			</div>
		</Scroller>
	</div>
</template>

<script>
//import {XHeader, Scroller, Panel} from 'vux'
import XHeader from 'vux/src/components/x-header'
import Scroller from 'vux/src/components/scroller'
import Panel from 'vux/src/components/panel'

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
		      },
		      {
		        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
		        title: '孜然牛肉',
		        desc: '上等黄牛肉',
		        price: '30.00',
		        btn: '来 一 份'
		      },
		      {
		        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
		        title: '红烧牛肉',
		        desc: '上等黄牛肉',
		        price: '20.00',
		        btn: '来 一 份'
		      },
		      {
		        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
		        title: '孜然牛肉',
		        desc: '上等黄牛肉',
		        price: '30.00',
		        btn: '来 一 份'
		      },
		      {
		        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
		        title: '孜然牛肉',
		        desc: '上等黄牛肉',
		        price: '30.00',
		        btn: '来 一 份'
		      },
			  {
		        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
		        title: '孜然牛肉',
		        desc: '上等黄牛肉',
		        price: '30.00',
		        btn: '来 一 份'
		      },
			  {
		        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
		        title: '孜然牛肉',
		        desc: '上等黄牛肉',
		        price: '30.00',
		        btn: '来 一 份'
		      },
			  {
		        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
		        title: '孜然牛肉',
		        desc: '上等黄牛肉',
		        price: '30.00',
		        btn: '来 一 份'
		      },
			  {
		        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
		        title: '孜然牛肉',
		        desc: '上等黄牛肉',
		        price: '30.00',
		        btn: '来 一 份'
		      },
			  {
		        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
		        title: '孜然牛肉',
		        desc: '上等黄牛肉',
		        price: '30.00',
		        btn: '来 一 份'
		      }],*/
		    list: [],
		    cart: [],
		    count: 0
		    
		}
	},
	created(){
		let gId = this.$route.query.groupId || 0;
		let url = this.COM.urls.product;
		this.$http.post(url,{pageNo:1,groupId:gId},this.COM.postOpt).then(
			function(response){
        	this.list = JSON.parse(response.body);
        	for(let i of this.list){
        		i.img = this.COM.imgHost + i.img;
        	}
	    },function(res){
	        this.COM.errorCallBack(res,this.$vux);
	    }
    )
	},
	mounted(){
	  	let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
		this.cart = cart;
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
	},
	methods:{
		onScroll(pos) {
	      this.scrollTop = pos.top
		},
		toCart(){
	  		this.$router.push({path:'/cart'});
	  	},
		addToCart(item){
	  	let el = event.currentTarget;
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
  		item.value = 1;
  		item.sum = item.price;
  		this.cart.push(item);
  		let c = 0;
  		for(let i of this.cart){
  			c += i.value;
  		}
  		this.count = c;
  		if(this.count > 0){
  			this.$refs.bage.style.display = 'block';
  		}else{
  			this.$refs.bage.style.display = 'none';
  		}
  		console.log(this.cart);
  		sessionStorage.setItem('cart',JSON.stringify(this.cart));
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