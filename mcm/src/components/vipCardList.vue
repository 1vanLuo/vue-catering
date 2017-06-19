<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">会员卡信息</x-header>
		<Scroller lock-x @on-scroll="onScroll" ref="vpListScroller">
			<div style="padding-bottom: 5px;">
				<div style="width: 94%;margin-left: 3%;background-color: #FF563C;color: #fff;margin-top: 10px;border-radius: 4px;box-sizing: border-box;padding-bottom: 10px;padding-top:10px;">
					<div class="own-vipcard__com" style="line-height: 1rem;font-size: 0.85rem;padding: 0 10px; box-sizing: border-box;">余额</div>
					<div class="own-vipcard__type" style="text-align: center;font-size:2rem;line-height: 2rem;">{{fee}}<i style="font-style: normal;font-size:0.75rem;margin-left:10px;">元</i></div>
				</div>
				<group title="套餐明细">
					<x-table :cell-bordered="false" style="background-color:#fff;">
				        <thead>
				          <tr>
				            <th>产品名称</th>
				            <th>剩余数量</th>
				          </tr>
				        </thead>
				        <tbody>
				          <tr v-for="c in combo">
				            <td>{{c.name}}</td>
				            <td>x {{residue_num}}</td>
				          </tr>
				        </tbody>
				        <tfoot>
				        	<tr>
				        		<td style="text-align: right;padding-right: 10px;" colspan="2">合计：{{combo.length}}</td>
				        	</tr>
				        </tfoot>
			      </x-table>
				</group>
			</div>
		</Scroller>
	</div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'
import XTable from 'vux/src/components/x-table'
import Scroller from 'vux/src/components/scroller'
import Group from 'vux/src/components/group'

import jQ from 'jquery'

export default{
	components:{
		XHeader,
		Scroller,
		XTable,
		Group
	},
	data(){
		return{
			fee:'',
			combo:[]
		}
	},
	created(){
		this.fee = this.$route.query.fee;
		let id = this.$route.query.id;
		let _this = this;
		_this.$vux.loading.show({
			text:'正在加载'
		});
		jQ.ajax({
			url:_this.COM.urls.getVipCombos,
			data:{'vid':id},
			type:'post',
			success:function(res){
				_this.$vux.loading.hide();
				_this.combo = res;
			},
			error:function(res){
				_this.COM.errorCallBack(res,_this.$vux);
			}
		})
	},
	mounted(){
		this.$nextTick(() => {
			let hbHeight = this.$refs.hb.$el.offsetHeight;
			let sc = this.$refs.vpListScroller
			let scHeight = window.innerHeight - hbHeight - 5;
			sc.$el.style.height = scHeight + 'px';
			sc.reset({top: 0})
		})
	},
	methods:{
		onScroll(pos) {
	      this.scrollTop = pos.top
		}
	}
}
</script>

<style>
</style>