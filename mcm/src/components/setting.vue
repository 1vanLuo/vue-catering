<template>
	<div>
		<x-header :left-options="{backText: ''}" ref="hb">设置</x-header>
		<Scroller lock-x height="-45" @on-scroll="onScroll" ref="stScroller">
			<group >
		      <cell title="修改密码" is-link link="/resetPassword">
		      	<i slot="icon" class="iconfont icon-mima" style="display:block;margin-right:5px;font-size: 1.1rem;color:#007aff"></i>
		      </cell>
		      <cell title="设置手势密码" is-link link="/setGesture">
		      	<i slot="icon" class="iconfont icon-shoushimima" style="display:block;margin-right:5px;font-size: 1.2rem;color:#ffc636"></i>
		      </cell>
		      <cell title="个人信息" is-link>
		      	<i slot="icon" class="iconfont icon-gerenxinxi" style="display:block;margin-right:5px;font-size: 1.2rem;color:#3cc51f"></i>
		      </cell>
		    </group>
		</Scroller>
	</div>
</template>

<script>
//import {XHeader, Scroller, Group, Cell} from 'vux'
import XHeader from 'vux/src/components/x-header'
import Scroller from 'vux/src/components/scroller'
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'

export default{
	components:{
		XHeader,
		Scroller,
		Group, 
		Cell
	},
	data(){
		return{
			
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
	}
}
</script>

<style>
</style>