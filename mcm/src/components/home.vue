<template>
  <div>
  		<div ref="dot" class="own-cart__dot"></div>
	  	<div class="own-header__search" ref="se">
				<input class="own-header__search__input" type="search" name="search" ref="search" v-model="pName" placeholder="搜索菜品" @keyup="searchProduct"/>
				<i class="iconfont icon-saoyisao" @click.self="toScanQrcode"></i>
				<i class="iconfont icon-fancai" ref="dc" @click.prevent="toCart"></i>
				<i class="iconfont icon-gerenzhongxin" ref="gr" @click.prevent="toPersonalCenter"></i>
				<span ref="bage" class="own-header__search__badge">{{count}}</span>
			</div>
			<swiper ref="sw" :list="banners" auto style="width:100%;margin:0 auto;" :aspect-ratio="400/720" dots-class="custom-bottom" dots-position="right"></swiper>
  		<grid ref="gd">
	      <grid-item v-for="g in groups">
	        <span slot="label" @click.prevent="clickGroup(g)">{{g.name}}</span>
	      </grid-item>
    	</grid>
		  <Scroller lock-x @on-scroll="onScroll" ref="homeScroller">
				<div>
					<panel header="精品菜单" :footer="footer" :list="list" :type="type" v-on:on-click-btn="addToCart" 
						v-on:on-click-item="clickItem"></panel>
				</div>
			</Scroller>
  </div>
</template>

<script>
//import { Swiper, Grid, GridItem, Panel, XButton, XHeader, Scroller} from 'vux'
import {Swiper} from 'vux/src/components/swiper'
import {Grid, GridItem} from 'vux/src/components/grid'
import Panel from 'vux/src/components/panel'
import XButton from 'vux/src/components/x-button'
import XHeader from 'vux/src/components/x-header'
import Scroller from 'vux/src/components/scroller'
import wx from 'weixin-js-sdk'
const baseList = [{
  url: 'http://m.baidu.com',
  img: '../../static/images/p2.jpg',
  title: '最新推出'
}, {
  url: 'http://m.baidu.com',
  img: '../../static/images/p3.jpg',
  title: '店长推荐'
}, {
  url: 'http://m.baidu.com',
  img: '../../static/images/p4.jpg',
  title: '优惠活动'
}]

export default {
  components: {
	    Swiper,
	    Grid,
	    GridItem,
	    Panel,
	    XButton,
	    Scroller,
	    XHeader
  },
  data () {
    return {
    	sessionStorage: window.sessionStorage,
      banners: baseList,
      groups:[],
      pName: '',
      type:'4',
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
      }],*/
     	list:[],
      footer: {
        title: '查看更多',
        url: '/menuList'
      },
      cart: [],
      count: 0,
      wxSDK:{}
    }
  },
  created:function(){
  	/*this.$http.post(this.COM.urls.banners,{responseType:'json',emulateJSON:true}).then(
			function(response){
        this.banners = response.body;
        console.log(response)
	    },function(response){
	        console.info(response);
	    }
    )*/
		this.$http.post(this.COM.urls.product,{pageNo:1},{responseType:'json',emulateJSON:true}).then(
			function(response){
        this.list = response.body;
        for(let i of this.list){
        	let src = i.img;
        	i.img = this.COM.imgHost + src;
        }
	    },function(response){
	        console.info(response);
	    }
    )
		this.$http.post(this.COM.urls.group,{responseType:'json',emulateJSON:true}).then(
			function(response){
        this.groups = response.body;
	    },function(response){
	        console.info(response);
	    }
    )
    let url = window.location.href;
		this.$http.post(this.COM.urls.getWxSdk,{'url':url},{responseType:'json',emulateJSON:true}).then(
			function(response){
        this.wxSDK = response.body;
        let _this = this;
        wx.config({
				    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: _this.wxSDK.appId, // 必填，公众号的唯一标识
				    timestamp: _this.wxSDK.timestamp, // 必填，生成签名的时间戳
				    nonceStr: _this.wxSDK.noncestr, // 必填，生成签名的随机串
				    signature: _this.wxSDK.signature,// 必填，签名，见附录1
				    jsApiList: ['scanQRCode','getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				/*wx.ready(function(){
					  wx.getLocation({
							type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
							success: function (res) {
								console.log('当前位置：'+res.latitude+','+res.longitude);
							}
						});
						_this.toScanQrcode = function(){
							wx.scanQRCode({
							    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
							    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
							    success: function (res) {
							    	_this.$router.push({path:'/scanQrcode',query:{id:res.resultStr}})
									}
							});
						}
				})*/
	    },function(response){
	        console.info(response);
	    }
    );
		
  },
  mounted: function(){
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
  	this.$nextTick(() => {
		  let seHeight = this.$refs.se.offsetHeight;
		  let swHeight = window.innerWidth / 1.8;
		  let gdHeight = this.$refs.gd.$el.offsetHeight;
		  let scHeight = window.innerHeight - seHeight - swHeight - gdHeight;
		  let sc = this.$refs.homeScroller;
		  sc.$el.style.height = scHeight + 'px';
		  sc.reset({top: 0})
		});
  },
  methods: {
  	isEmptyObject(e) {  
		    var t;  
		    for (t in e)  
		        return !1;  
		    return !0  
		},
  	toCart(){
  		this.$router.push({path:'/cart'});
  	},
  	toScanQrcode(){
  		this.$router.push({path:'/scanQrcode',query:{id:'3413096687977472'}})
  	},
  	toPersonalCenter(){
  		this.$router.push({path:'/personalCenter'});
  	},
  	onScroll(pos) {
      this.scrollTop = pos.top
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
  		event.stopPropagation()
	  },
	  clickGroup(g){
	  	console.log(g.id)
	  	this.$router.push({path:'/menuList',query:{groupId:g.id}});
	  },
	  searchProduct(){
	  	console.log(this.pName)
	  	this.$http.post(this.COM.urls.product,{pageNo:1,pName:this.pName},{emulateJSON:true,responseType:'json'}).then(
				function(response){
	        this.list = response.body.list;
	        console.log(response)
		    },function(response){
		        console.info(response);
		    }
	    )
	  },
	  clickItem(item){
	  	this.$router.push({path:'/productView',query:{id:item.id}});
	  }
  }
}
</script>

<style lang="less">

</style>
