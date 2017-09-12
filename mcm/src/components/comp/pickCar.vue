<template>
    <div v-transfer-dom>
        <popup v-model="showPop" height="100%" style="background-color:#fff" @on-first-show="resetScroller">
            <x-header height="-44" :left-options="{backText: '',preventGoBack:true}"
            @on-click-back="hideThis()" ref="hb">选择车辆</x-header>
            <scroller lock-x @on-scroll="onScroll" ref="scroller">
                <div>
                    <div v-for="c in this.data" style="padding:10px 15px;font-size:0.875rem;
                    border-bottom:1px solid #eaeaea" @click="pickACar(c)">
                        <span>{{c.carNo}}</span>
                        <span style="margin-left:10px">{{c.customer.name}}</span>
                    </div>
                </div>
            </scroller>   
        </popup>
    </div>
</template>

<script>
import Popup from 'vux/src/components/popup/index'
import TransferDom from 'vux/src/directives/transfer-dom'
import Scroller from 'vux/src/components/scroller/index.vue'
import XHeader from 'vux/src/components/x-header/index.vue'
import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox'

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
        },
        data:{
            type:Array,
            required:true,
            default () {
                return []
            }
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
            console.log('!!!!!==='+val)
            this.showPop = val;
        }
    },
    created(){
    },
    mounted(){
    },
    methods:{
        resetScroller () {
            this.$nextTick(() => {
                this.$refs.scroller.reset();
            });
        },
        onScroll(pos) {
            this.scrollTop = pos.top
        },
        hideThis(){
            this.$emit("on-hide",'');
        },
        pickACar(car){
            this.$emit("on-hide",car);
        }
    }
}
</script>

<style lang="less">

</style>
