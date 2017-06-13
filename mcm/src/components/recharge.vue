<template>
	<div style="height: 100%;background-color: #fff;">
		<x-header :left-options="{backText: ''}" ref="hb">会员充值</x-header>
		<divider>选择充值金额</divider>
	    <div class="box">
	      <checker v-model="fee" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
		      <checker-item value="500">500元</checker-item>
		      <checker-item value="1000">1000元</checker-item>
		      <checker-item value="2000">2000元</checker-item>
	      </checker>
	    </div>
	    <input type="number" name="" id="" v-model="iptFee" class="own-recharge__input" placeholder="手动输入充值金额"/>
	    <input type="text" name="" id="" value="" class="own-recharge__input" placeholder="备注" style="color:#888"/>
	    <button class="own-login__btn" style="margin-top: 30px;margin-bottom: 50px;" @click.prevent="recharge">微信支付</button>
	</div>
</template>

<script>
//import {XHeader,Divider,Checker,CheckerItem,TransferDomDirective as TransferDom } from 'vux'
import XHeader from 'vux/src/components/x-header'
import Divider from 'vux/src/components/divider'
import {Checker,CheckerItem} from 'vux/src/components/checker'
import {TransferDomDirective as TransferDom} from 'vux/src/directives/transfer-dom/index.js'

export default{
	directives: {
	    TransferDom
	},
	components:{
		XHeader,
		Divider,
		Checker,
		CheckerItem
	},
	data(){
		return{
			fee: 0,
			show: false,
			vipNo: '',
			phone: '',
			iptFee: ''
		}
	},
	watch:{
		iptFee:{
			handler(newVal, oldVal){
				if(newVal != ''){
					this.fee = newVal;
				}
			},
			deep: true
		}
	},
	methods:{
		recharge(){
		   if(this.fee > 0){
		   	  let content = '为手机号'+this.phone+'充值'+this.fee+'元';
		   	  let _this = this;
		   	  this.$vux.confirm.show({
		        title: '会员充值',
		        content: content,
		        onShow () {
		          console.log('plugin show')
		        },
		        onHide () {
		          console.log('plugin hide')
		        },
		        onCancel () {
		          console.log('plugin cancel')
		        },
		        onConfirm () {
					_this.$vux.loading.show({
					   text: '正在为您充值'
					});
					setTimeout(function(){
						_this.$vux.loading.hide()
					},3000)
		        }
		      })
		   }else{
		   		let _this = this;
		   	    this.$vux.toast.show({
		          text: '请选择或输入充值金额',
		          type: 'warn',
		          onShow () {
		          },
		          onHide () {
		          }
		        })
		   }
		}
	}
}
</script>

<style scoped>
body {
  background-color: #fff !important;
}
.box {
  padding: 0 15px;
}
.demo1-item {
  border: 1px solid #FF563C;
  border-radius: 3px;
  width: 25% !important;
  color: #FF563C;
}
.demo1-item-selected {
	background-color: #FF563C;
	color: #fff;
}
.vux-checker-item{
	height: 2rem;
	text-align: center;
	margin-right: 3%;
	margin-left: 3%;
	line-height: 2rem;
}
</style>