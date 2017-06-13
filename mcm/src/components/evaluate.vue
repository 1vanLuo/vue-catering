<template>
	<div>
		<x-header :left-options="{backText: ''}"  ref="hb">评价</x-header>
		<div class="own-ev__title">商品评价</div>
		<div v-for="ol in orderList" class="own-ev__evcard">
			<div class="name">{{ol.product.name}}</div>
		    <rater v-model="ol.score" :max="5" active-color="#ff563c" :font-size="20"></rater>
			<div style="width: 100%;margin-top:10px;box-sizing: border-box;">
				<textarea style="width: 100%;font-size:0.8rem;line-height:1.2;box-sizing: border-box;padding: 5px;resize:none;
					border: 1px solid #E9E9E9;border-radius:3px;" rows="3" draggable="false" placeholder="在这里输入评价内容"
					v-model="ol.eva"></textarea>
			</div>
		</div>
		<button class="own-login__btn" style="margin-bottom: 20px;" @click="subEva">提交评价</button>
	</div>
</template>

<script>
//import {XHeader, Rater, XTextarea} from 'vux'
import XHeader from 'vux/src/components/x-header'
import Rater from 'vux/src/components/rater'
import XTextarea from 'vux/src/components/x-textarea'

export default{
	components:{
		XHeader,
		Rater,
		XTextarea
	},
	data(){
		return{
			orderList:[],
			score:0,
			evaList:[]
		}
	},
	created(){
		let jsonStr = window.sessionStorage.getItem('orderView');
		let order = JSON.parse(jsonStr) || {};
		console.log(order)
		for(let ol of order.orderLists){
			ol.score = 0;
			ol.eva = '';
		}
		this.orderList = order.orderLists;
		console.log(this.orderList)
	},
	methods:{
		subEva(){
			let evas = [];
			let eva = {};
			for(let ol of this.orderList){
				eva.productReleaseId = ol.productReleaseId;
				eva.productId = ol.product.id;
				eva.quality = ol.score;
				eva.content = ol.eva;
				evas.push(eva);
			}
			console.log(evas);
			this.$vux.loading.show({
			   text: '正在提交评价'
			});
			let _this = this;
			setTimeout(function(){
				_this.$vux.loading.hide()
			},3000)
		}
	}
}
</script>

<style lang="less" scoped>
.weui-cell{
	padding: 5px 0 !important;
}
.vux-cell-primary>p>.vux-label{
	font-size: 0.7rem !important;
}
</style>