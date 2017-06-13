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
				<button class="btn weui-media-box__btn" @click.stop="addToCart">来一份</button>
				<div class="clearfix"></div>
			</div>
		</div>
		<div class="own-pv__evaluatediv">
			<div class="title">评价</div>
			<div class="evaluatediv" v-for="e in product.evaluate" v-if="product.evaluate">
				<div class="namediv">
					<span class="name">{{e.userName}}</span>
					<span class="date">{{e.createDate}}</span>
				</div>
				<div class="contentdiv">{{e.content}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'

export default{
	components:{
	},
	data(){
		return{
			/*product:{
				id:'245353467',
				img:'../../static/images/p1.jpg',
				name:'口味虾',
				desc:'新鲜活虾',
				price:'50.00',
				evaluate:[
					{
						content:'味道非常好！',
						userName:'张三',
						createDate:'2017-6-11 13:08:59',
						service:'5',
						quality:'5'
					},
					{
						content:'虾子很新鲜，干净，味道好！',
						userName:'李四',
						createDate:'2017-6-11 13:08:59',
						service:'4',
						quality:'5'
					}
				]
			},*/
			product:{},
			cart:[],
			count:0
		}
	},
	created(){
		let id = this.$route.query.id;
		this.$http.post(this.COM.urls.productDetail,{'pId':id},{responseType:'json',emulateJSON:true}).then(
			function(response){
		        this.product = response.body;
		        this.product.img = this.COM.imgHost + this.product.img;
		    },function(response){
		        console.info(response);
		    }
	    )
	},
	mounted(){
		let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
		console.log(cart)
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
		addToCart(){
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
	  		let item = this.product;
	  		item.value = 1;
	  		item.sum = this.product.price;
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