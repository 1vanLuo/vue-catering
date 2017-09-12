<template>
    <div>
        <x-header :left-options="{backText: ''}" ref="hb">完善订单信息</x-header>
        <scroller lock-x height="-44" @on-scroll="onScroll" ref="preOrderScroller">
			<div>
				<group>
                    <cell :title="deliveryAddress.nameAndPhone" :inline-desc="deliveryAddress.address" is-link @click.native="doPickAddress"></cell>
			    </group>
                <div style="margin:10px 0">
                    <group>
                        <x-table :cell-bordered="false" style="background-color:#fff;">
                            <thead>
                            <tr>
                                <th>商品</th>
                                <th>单价</th>
                                <th>数量</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="ol in orderList">
                                <td>
                                    <img :src="ol.img" width="50px" height="50px" style="margin-top:5px"/>
                                    <div style="line-height:1rem;margin-bottom:5px">{{ol.name}}</div>
                                </td>
                                <td>&yen;{{ol.price}}</td>
                                <td>x {{ol.num}}</td>
                            </tr>
                            </tbody>
                        </x-table>
                    </group>
                </div>
                <group> 
                    <x-input title="订单备注" type="text" placeholder="在此填写备注" 
                    v-model="remark" ></x-input>
			    </group>
			    <button class="own-login__btn" style="margin-bottom: 20px" @click="subOrder" disabled>提交并支付订单</button>
			</div>
		</scroller>
        <PickDeliveryAddress :show="isShow" v-on:on-hide="hide"></PickDeliveryAddress>
    </div>
</template>

<script>
import XHeader from 'vux/src/components/x-header/index.vue'
import Scroller from 'vux/src/components/scroller/index.vue'
import Group from 'vux/src/components/group/index.vue'
import XInput from 'vux/src/components/x-input/index.vue'
import Cell from 'vux/src/components/cell/index.vue'
import CellBox from 'vux/src/components/cell-box/index.vue'
import XTable from 'vux/src/components/x-table/index.vue'
import {Grid, GridItem} from 'vux/src/components/grid'
import PickDeliveryAddress from './comp/pickDeliveryAddress.vue'


export default {
    components:{
        XHeader,
        Scroller,
        Group,
        XInput,
        Cell,
        CellBox,
        XTable,
        Grid,
        GridItem,
        PickDeliveryAddress
    },
    data(){
        return{
            deliveryAddress:{
                nameAndPhone:'选择收货地址',
                address:''
            },
            remark:'',
            orderList:[],
            isShow:false,
            preOrder:{}
        }
    },
    created(){
		this.orderList = JSON.parse(window.sessionStorage.getItem('cart')) || [];
    },
    methods:{
        subOrder(){
        },
        onScroll(pos) {
	        this.scrollTop = pos.top
        },
        doPickAddress(){
            this.isShow = true;
        },
        hide(item){
            this.isShow = false;
            if(item != 'undefined' && item != ''){
                this.deliveryAddress = item;
            }
        }
    }
}
</script>


<style>
.vux-datetime{
	padding: 0 15xp !important;
	font-size: 0.875rem !important;
}
.vux-cell-primary .vux-label{
    font-size: 0.875rem !important;
}
.weui-cell__ft{
    font-size: 0.875rem !important;
}
</style>
