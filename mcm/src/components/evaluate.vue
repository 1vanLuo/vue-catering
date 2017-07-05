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
import XHeader from 'vux/src/components/x-header/index.vue'
import Rater from 'vux/src/components/rater/index.vue'
import XTextarea from 'vux/src/components/x-textarea/index.vue'

import jQ from 'jquery'

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
			evaList:[],
			bizId:''
		}
	},
	created(){
		let jsonStr = window.sessionStorage.getItem('orderView');
		let order = JSON.parse(jsonStr) || {};
		console.log(order)
		for(let ol of order.orderList){
			ol.score = 0;
			ol.eva = '';
		}
		this.orderList = order.orderList;
		this.bizId = order.id;
		console.log(this.orderList);
	},
	methods:{
		subEva(){
			let evas = [];
			let eva = {};
			for(let ol of this.orderList){
				eva.productReleaseId = ol.productReleaseId;
				eva.productId = ol.product.id;
				eva.quality = ol.score;
				eva.service = ol.score;
				eva.content = ol.eva;
				eva.bizId = this.bizId;
				evas.push(eva);
			}
			console.log(evas);
			this.$vux.loading.show({
			   text: '正在提交评价'
			});
			let _this = this;
			jQ.ajax({
				url:_this.COM.urls.saveEvaluate,
				type:'post',
				data:{evaList:JSON.stringify(evas)},
				success:function(res){
					let rejo = res;
					_this.$vux.loading.hide();
					_this.$vux.alert.show({
				        title: '提示',
				        content: rejo.msg,
				        onShow () {
				        },
				        onHide () {
				          if(rejo.code > 0){
				          	_this.$router.push('/orderView')
				          }
				        }
				    });
				},
				error:function(res){
					_this.COM.errorCallBack(res,_this.$vux);
				}
			})
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