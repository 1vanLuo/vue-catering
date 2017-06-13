<template>
	<div >
		<x-header :left-options="{backText: ''}" ref="hb">扫一扫</x-header>
    	<div class="own-scan__dishCard">
    		<img v-bind:src="product.img"/>
    		<div class="own-scan__desc" ref="desc"></div>
    		<div class="own-scan__numpicker">
    			<div @click.prevent="add()" class="own-xnumber__btn">+</div>
            	<input ref="num" class="own-xnumber__ipt" readonly="readonly" :value="num" pattern="[0-9]*" type="number" min="1"/>
		        <div @click.prevent="sub()" class="own-xnumber__btn">-</div>
		        <div style="color: #FF563C;float: left;"><i class="own-moneysmbol"></i>{{sumPrice}}</div>
		        <div class="clearfix"></div>
            </div>
            <button style="width:100%;font-size:0.85rem;border:none;height:2.5rem;background-color: #FF563C;color: #fff;border-radius: 0 0 5px 5px;">支 付</button>
    	</div>
	</div>
</template>

<script>
//import {XHeader, XButton} from 'vux'
import XHeader from 'vux/src/components/x-header'
import XButton from 'vux/src/components/x-button'
export default{
	components:{
		XHeader,
		XButton
	},
	data(){
		return{
			num: 1,
			price: 30.00,
			product:{}
		}
	},
	created(){
		let pid = this.$route.query.id;
		this.$http.post(this.COM.urls.productDetail,{'pId':pid},{responseType:'json',emulateJSON:true}).then(
		function(response){
	        this.product = response.body;
	        this.product.img = this.COM.imgHost + this.product.img;
	        this.$refs.desc.innerHTML = this.product.desc;
	        console.log(response)
	    },function(response){
	        console.info(response);
	    }
    )
	},
	computed:{
		sumPrice:function(){
			return this.num * this.product.price;
		}
	},
	methods:{
		add(){
			++this.num;
	    },
	    sub(){
	    	if(this.num > 1){
	    		this.num--;
	    	}
	    }
	}
}
</script>

<style lang="less">
.own-scan__numpicker{
	padding: 0 10px;
	margin-bottom: 10px
}
</style>