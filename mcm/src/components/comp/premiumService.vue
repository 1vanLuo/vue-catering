<template>
    <div v-transfer-dom>
        <popup v-model="showPop" height="100%" style="background-color:#fff" @on-first-show="resetScroller">
            <x-header height="-44" :left-options="{backText: '',preventGoBack:true}"
            @on-click-back="hideThis()" ref="hb">附加服务</x-header>
            <scroller lock-x @on-scroll="onScroll" ref="scroller">
                <div>
                    <div style="border-bottom:1px solid #eaeaea;padding:5px 0" v-for="se in data">
                        <flexbox>
                            <flexbox-item :span="1/3"><div class="own-shape" style="font-size:1rem;color:#000">{{se.name}}</div></flexbox-item>
                            <flexbox-item :span="2/3">
                                <div style="text-align:right;color:#ff563c;padding-right:10px;font-size:1rem">&yen;{{se.price}}</div>
                            </flexbox-item>
                        </flexbox>
                        <flexbox>
                            <flexbox-item :span="2/5"><div class="own-shape">合计:<span>&yen;{{se.sum}}</span></div></flexbox-item>
                            <flexbox-item :span="3/5">
                                <div style="padding-right:10px">
                                    <div class="own-xnumber__btn" @click="onAddService(se)">+</div>
                                    <input ref="num" class="own-xnumber__ipt" 
                                    v-model="se.num" readonly="readonly" pattern="[0-9]*" type="number" min="1"/>
                                    <div class="own-xnumber__btn" @click="onSubService(se)">-</div>
                                </div>
                            </flexbox-item>
                        </flexbox>
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
        onAddService(item){
            this.$emit("on-add-service",item);
        },
        onSubService(item){
            this.$emit("on-sub-service",item);
        }
    }
}
</script>

<style lang="less">

</style>
