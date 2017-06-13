<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">我的优惠券</x-header>
		<button class="own-login__switch" @click.stop="exchange">兑换优惠券</button>
		<Scroller lock-x height="-45" @on-scroll="onScroll" ref="stScroller">
	      <div class="own-cp__wrapper">
	      	<div class="fee">
	      		<div style="height: 2.7rem;line-height:2.7rem;font-weight: bold;color: #FF563C; text-align: center;">
	      			<i style="font-style: normal;font-size: 0.9rem;margin-right:3px;">&yen;</i><i style="font-style: normal;font-size: 1.5rem;">40</i>
	      		</div>
	      		<div style="height:1rem;line-height:1rem;font-size: 0.75rem;color:#999;text-align: center;">使用说明</div>
	      	</div>
	      	<div class="desc">
	      		<div style="font-size: 1rem;font-weight: bold;line-height: 2.3rem;height: 2.3rem;">中南石锅鱼</div>
	      		<div style="font-size: 0.75rem;line-height: 1.3;">满100元可用，每单限用一张</div>
	      		<div style="font-size: 0.75rem;box-sizing: border-box;">有效期：2017-06-01至2017-06-30</div>
	      	</div>
	      	<div class="clearfix"></div>
	      </div>
		</Scroller>
		<div v-transfer-dom>
	      <x-dialog v-model="showDialogStyle" :hide-on-blur="hob" :dialog-style="{'max-width': '70%', width: '70%', height: '25%', 'background-color': '#fff'}">
	        <p style="color:#fff;text-align:center;">
	          <input placeholder="请输入兑换码" 
	          	style="border: none;font-size: 0.85rem;width: 70%;text-align: center;line-height: 1.7rem;border-bottom: 1px solid #ECECEC;"/>
	          <br>
	          <button style="margin-top: 20px;border: none;background-color: #FF563C;color: #fff;
	          	font-size:0.85rem; width: 60%;line-height: 2rem;border-radius: 3px;">兑 换</button>
	          <br>
	          <div style="font-size: 0.75rem;color: #FF563C;">扫码兑换</div>
	          <!--<x-icon type="ios-close-empty" style="fill:#FF563C;position: absolute;top:0;right: 0;" size="27"></x-icon>-->
	        </p>
	      </x-dialog>
	    </div>
	</div>
</template>

<script>
//import {XHeader, Scroller, Group, XDialog, TransferDomDirective as TransferDom} from 'vux'
import XHeader from 'vux/src/components/x-header'
import Group from 'vux/src/components/group'
import XDialog from 'vux/src/components/x-dialog'
import Scroller from 'vux/src/components/scroller'
import {TransferDomDirective as TransferDom} from 'vux/src/directives/transfer-dom/index.js'
export default{
	directives: {
	    TransferDom
	},
	components:{
		XHeader,
		Scroller,
		Group, 
		XDialog
	},
	data(){
		return{
			showDialogStyle:false,
			hob: true
		}
	},
	created(){
		
	},
	mounted(){
		
	},
	methods:{
		onScroll(pos) {
	      this.scrollTop = pos.top
	    },
	    exchange(){
	    	this.showDialogStyle = true;
	    }
	}
}
</script>

<style>
</style>