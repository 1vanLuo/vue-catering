<template>
    <div v-transfer-dom>
        <popup v-model="showPop" height="100%" @on-first-show="resetScroller" style="background-color:#fff">
            <x-header :left-options="{backText: '', preventGoBack:true}" v-on:on-click-back="hide" ref="hb">任务详情</x-header>
            <Scroller height="-45" lock-x @on-scroll="onScroll" ref="scroller">
                <div>
                    <!-- <form-preview :header-label="data.name" 
                    :header-value="data.status" :body-items="data.list"></form-preview> -->
                    <div class="vux-form-preview weui-form-preview">
                        <div class="weui-form-preview__hd">
                            <label class="weui-form-preview__label">{{datas.name}}</label>
                            <em class="weui-form-preview__value">{{datas.statusName}}</em>
                        </div> 
                        <div class="weui-form-preview__bd">
                            <div class="weui-form-preview__item">
                                <label class="weui-form-preview__label">单位</label> 
                                <span class="weui-form-preview__value">{{datas.companyName}}</span>
                            </div>
                            <div class="weui-form-preview__item">
                                <label class="weui-form-preview__label">执行人</label>
                                <span class="weui-form-preview__value">{{datas.executor}}</span>
                            </div>
                            <div class="weui-form-preview__item">
                                <label class="weui-form-preview__label">检查人</label> 
                                <span class="weui-form-preview__value">{{datas.checkMan}}</span>
                            </div>
                            <div class="weui-form-preview__item">
                                <label class="weui-form-preview__label">负责人</label> 
                                <span class="weui-form-preview__value">{{datas.leader}}</span>
                            </div>
                            <div class="weui-form-preview__item">
                                <label class="weui-form-preview__label">计划开始时间</label> 
                                <span class="weui-form-preview__value">{{datas.playBeginDate}}</span>
                            </div>
                            <div class="weui-form-preview__item">
                                <label class="weui-form-preview__label">计划结束时间</label> 
                                <span class="weui-form-preview__value">{{datas.playEndDate}}</span>
                            </div>
                            <div class="weui-form-preview__item">
                                <label class="weui-form-preview__label">计划工期</label> 
                                <span class="weui-form-preview__value">{{datas.planWorkDays}}</span>
                            </div>
                            <div class="weui-form-preview__item">
                                <label class="weui-form-preview__label">实际开始时间</label> 
                                <span class="weui-form-preview__value">{{datas.actualBeginDate }}</span>
                            </div>
                            <div class="weui-form-preview__item">
                                <label class="weui-form-preview__label">实际结束时间</label> 
                                <span class="weui-form-preview__value">{{datas.planWorkDays}}</span>
                            </div>
                            <div class="weui-form-preview__item">
                                <label class="weui-form-preview__label">实际工期</label> 
                                <span class="weui-form-preview__value">{{datas.actualWorkDays}}</span>
                            </div>
                            <div class="weui-form-preview__item">
                                <label class="weui-form-preview__label">任务分类</label> 
                                <span class="weui-form-preview__value">{{datas.classify}}</span>
                            </div>
                            <div class="weui-form-preview__item">
                                <label class="weui-form-preview__label">排序</label> 
                                <span class="weui-form-preview__value">{{datas.sort}}</span>
                            </div>
                            <div class="weui-form-preview__item">
                                <label class="weui-form-preview__label">预警天数</label> 
                                <span class="weui-form-preview__value">{{datas.warningDay}}</span>
                            </div>
                            <div class="weui-form-preview__item">
                                <label class="weui-form-preview__label">执行说明</label> 
                                <span class="weui-form-preview__value">{{datas.workExplain}}</span>
                            </div>
                            <div class="weui-form-preview__item">
                                <label class="weui-form-preview__label">检查结果</label> 
                                <span class="weui-form-preview__value">{{datas.result}}</span>
                            </div>
                            <div class="weui-form-preview__item">
                                <label class="weui-form-preview__label">备注</label> 
                                <span class="weui-form-preview__value">{{datas.remarks}}</span>
                            </div>
                        </div> 
                        <div class="weui-form-preview__ft"></div>
                    </div>
                </div>
            </Scroller>
        </popup>
    </div>
</template>

<script>
import XHeader from 'vux/src/components/x-header/index.vue'
import Scroller from 'vux/src/components/scroller/index.vue'
import FormPreview from 'vux/src/components/form-preview/index.vue'
import TransferDom from 'vux/src/directives/transfer-dom'
import Popup from 'vux/src/components/popup/index'

export default {
    directives: {
        TransferDom
    },
    components:{
        XHeader,
        Scroller,
        FormPreview,
        Popup
    },
    props:{
        datas:{
            type:Object,
            required:true
        },
        show:{
            type:Boolean,
            required:true
        }
    },
    data(){
        return{
            showPop:false
        }
    },
    watch:{
        show (val) {
            this.showPop = val;
        }
    },
    created(){
    },
    methods:{
        resetScroller () {
            this.$nextTick(() => {
                this.$refs.scroller.reset();
            });
        },
        hide(){
            this.$emit("on-hide");
        },
        onScroll(pos) {
	        this.scrollTop = pos.top
        }
    }
}
</script>

<style lang="less">

</style>
