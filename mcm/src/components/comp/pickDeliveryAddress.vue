<template>
    <div v-transfer-dom>
        <popup v-model="showPop" height="100%" style="background-color:#fff" @on-first-show="resetScroller">
            <x-header height="-44" :left-options="{backText: '',preventGoBack:true}"
            @on-click-back="hideThis({})" ref="hb">选择收货地址</x-header>
            <scroller height="-50" lock-x @on-scroll="onScroll" ref="scroller">
                <div>
                    <group>
                        <cell v-for="d in deliveryAddressList" :title="d.nameAndPhone" :inline-desc="d.address" 
                            is-link @click.native="hideThis(d)"></cell>
                    </group>
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
import Cell from 'vux/src/components/cell/index.vue'
import CellBox from 'vux/src/components/cell-box/index.vue'
import Group from 'vux/src/components/group/index.vue'


export default {
    directives: {
        TransferDom
    },
    components:{
        Popup,
        Scroller,
        XHeader,
        Cell,
        CellBox,
        Group
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
            deliveryAddressList:[
                {
                    receiveMan:'张三',
                    phone:'18888888888',
                    nameAndPhone:'张三 188888888',
                    address:'XX省XX市XX区XX路XX号'
                }
            ]
        }
    },
    watch:{
        show (val) {
            this.showPop = val;
        }
    },
    created(){
        let _this = this;
        
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
        hideThis(item){
            if(JSON.stringify(item) != '{}'){
                this.$emit("on-hide",item);   
            }else{
                this.$emit("on-hide",'');
            }
        }
    }
}
</script>

<style lang="less">

</style>
