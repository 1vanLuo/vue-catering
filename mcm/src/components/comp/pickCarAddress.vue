<template>
    <div v-transfer-dom>
        <popup v-model="showPop" height="100%" style="background-color:#fff">
            <x-header :left-options="{backText: '',preventGoBack:true}"
            @on-click-back="hideThis()" ref="hb">选择地点</x-header>
           <!--  <scroller lock-x @on-scroll="onScroll" ref="scroller">
                <div>
                    <div v-for="c in this.data" style="padding:10px 15px;font-size:0.875rem;
                    border-bottom:1px solid #eaeaea" @click="pickACar(c)">
                        <span>{{c.carNo}}</span>
                        <span style="margin-left:10px">{{c.customer.name}}</span>
                    </div>
                </div>
            </scroller>  -->  
            <iframe ref="addrMap" frameborder=0 width="100%" height="92%"
    				src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=CNWBZ-NIUKU-VWXVH-4GPAU-XKAKO-SABKH&referer=微信开发">
			</iframe>
        </popup>
    </div>
</template>

<script>
import Popup from 'vux/src/components/popup/index'
import TransferDom from 'vux/src/directives/transfer-dom'
import Scroller from 'vux/src/components/scroller/index.vue'
import XHeader from 'vux/src/components/x-header/index.vue'
import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox'

import jQ from 'jquery'

export default {
    directives: {
        TransferDom
    },
    components:{
        Popup,
        Scroller,
        XHeader,
        Flexbox,
        FlexboxItem
    },
    props:{
        show:{
            type:Boolean,
            required:true
        }
    },
    data(){
        return{
            showPop:false,
            num:1
        }
    },
    watch:{
        show (val) {
            this.showPop = val;
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
        hideThis(){
            this.$emit("on-hide",'');
        },
        pickACar(car){
            this.$emit("on-hide",car);
        },
        selectAddrMap(obj){
            jQuery('#mapModal').addClass('mui-active');
            jQuery('#appo-time').removeClass('mui-active');
            addrEl = obj;
            window.addEventListener('message',callBackAddr, false); 
        },
        callBackAddr(event) {
            // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
            var loc = event.data;
            if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
            addrEl.value = loc.poiaddress;
            document.querySelector('#sure-addr').style.display = 'block';
            }                                
        }
    }
}
</script>

<style lang="less">

</style>
