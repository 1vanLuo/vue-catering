<template>
	<div class="own-pv">
		<div ref="dot" class="own-cart__dot"></div>
		<div class="own-pv__imgdiv">
			<img v-bind:src="product.img" class="own-pv__img"/>
			<div class="own-pv__desc" ref="desc" v-html="product.desc"></div>
			<i class="iconfont icon-fanhui" @click.prevent="back"></i>
			<i class="iconfont icon-fancai" ref="dc" @click.prevent="toCart"></i>
			<span ref="bage" style="display: inline-block;font-size: 12px;height: 15px;width:15px;border-radius:50%;background-color: rgb(60,197,31);color: #fff;text-align: center;line-height: 15px;
				top: 0.2rem;right: 0.3rem;position: absolute;">{{count}}</span>
		</div>
		<div class="own-pv__namediv">
			<div class="name">{{product.name}}</div>
			<div class="pricediv">
				<div class="price"><i class="own-moneysmbol"></i>{{product.price}}</div>
				<div class="vipPrice" style="font-size: 0.8rem;color:#aaa;line-height:2rem;float: left;margin-left: 10px;">会员价:&yen;{{product.vipPrice}}</div>
				<button class="btn weui-media-box__btn" @click.stop="addToCart">来一份</button>
				<div class="clearfix"></div>
			</div>
		</div>
		<div class="own-pv__evaluatediv">
			<div class="title">评价</div>
			<div class="evaluatediv" v-for="e in product.evaluate" v-if="product.evaluate">
				<div class="namediv">
					<span class="name">{{e.userName}}</span>
					<span class="date">{{e.createDate | formatDate}}</span>
				</div>
				<div class="contentdiv">{{e.content}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header/index.vue'

import jQ from 'jquery'

export default{
	components:{
	},
	data(){
		return{
			product:{},
			cart:[],
			count:0
		}
	},
	filters:{
		formatDate(date){
			var  nowTime = new Date();
			if(date != undefined && date != null && date != ''){
				nowTime = new Date(date);
			}
			var  year = nowTime.getFullYear(); // 年
			var  month = nowTime.getMonth() + 1; // 月
			var  day = nowTime.getDate(); // 日
			var  hh = nowTime.getHours(); // 时
			var  mm = nowTime.getMinutes(); // 分
			var  ss = nowTime.getSeconds(); // 秒
			var  clock = year + "-";
		
			if (month < 10)
				clock += "0";
		
			clock += month + "-";
		
			if (day < 10)
				clock += "0";
		
			clock += day + " ";
		
			if (hh < 10)
				clock += "0";
		
			clock += hh + ":";
			if (mm < 10)
				clock += '0';
			clock += mm +":";
			
			if (ss < 10)
				clock += '0';
			clock += ss ;
			
			
			return clock;
		}
	},
	created(){
		let id = this.$route.query.id;
		this.$http.post(this.COM.urls.productDetail,{'pId':id},this.COM.postOpt).then(
			function(response){
		        this.product = JSON.parse(response.bodyText);
		        this.product.img = this.COM.imgHost + this.product.img;
		        this.product.num = 1;
		        let evas = product.evaluate;
		        for(let e of evas){
		        	let t = e.createDate;
		        	e.createDate = this.COM.formatDate(t);
		        }
		        this.product.evaluate = evas;
		    },function(res){
		        this.COM.errorCallBack(res,this.$vux);
		    }
	   )
	},
	mounted(){
		let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
		console.log(cart)
		this.cart = cart;
		let ct = 0;
		for(let i of this.cart){
			ct += i.num;
		}
		this.count = ct;
		if(this.count > 0){
			this.$refs.bage.style.display = 'block';
		}else{
			this.$refs.bage.style.display = 'none';
		}
	},
	watch:{
	},
	methods:{
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
				  		console.log('=====this.cart=======')
				  		console.log(_this.cart);
				  		sessionStorage.setItem('cart',JSON.stringify(_this.cart));
	 	  			}
	 	  		},
	 	  		error:function(res){
	 	  			_this.COM.errorCallBack(res,_this.$vux);
	 	  		}
	 	  	});
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
		addToCart(){
			let item = this.product;
		  	let index = 0;
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
	    toCart(){
	  		this.$router.push({path:'/cart'});
	  	},
	  	back(){
	  		this.$router.go(-1)
	  	}
	}
}
</script>

<style>
</style>