<template>
    <div>
        <x-header :left-options="{backText: ''}" ref="hb">意见反馈</x-header>
        <group title="请在下面填写您的意见和建议">
            <x-textarea v-model="feedback"></x-textarea>
        </group>
        <div style="padding:0 15px;color:#ff563c;margin-top:10px">添加图片说明</div>
        <grid>
            <grid-item v-for="(img,index) in imgList" @click.native="clickImg(index,img)">
                <img slot="icon" :src="img.src">
            </grid-item>
        </grid>
        <actionsheet v-model="showAct" :menus="menus" theme="android" @on-click-menu="clickMenu"></actionsheet>
        <button class="own-login__btn" style="margin-bottom: 20px;" @click.stop="saveFeedBack" disabled>提交</button>
    </div>
</template>

<script>
import XHeader from 'vux/src/components/x-header/index.vue'
import Group from 'vux/src/components/group/index.vue'
import XTextarea from 'vux/src/components/x-textarea/index.vue'
import Actionsheet from 'vux/src/components/actionsheet/index.vue'
import {Grid, GridItem} from 'vux/src/components/grid'


export default{
    components:{
        XHeader,
        Group,
        XTextarea,
        Grid,
        GridItem,
        Actionsheet
    },
    data(){
        return{
            wxSDK:{},
            feedback:'',
            imgList:[
                {
                    src:'data:image/png;base64,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',
                    isClickAdd:true,
                    serverId:''
                }
            ],
            num:9,
            serverIds:[],
            showAct:false,
            menus:[
                {
                    label:'删除',
                    type:'warn',
                    value:'1'
                }
            ],
            index:0
        }
    },
    created(){
    },
    methods:{
        getImgs(){

        },
        syncUpload(localIds){
        },
        clickImg(index,img){
            if(img.isClickAdd){
                this.getImgs();
            }else{
                this.showAct = true;
                this.index = index;
            }
        },
        clickMenu(){
            let _this = this;
            _this.imgList.splice(_this.index,1);
        },
        saveFeedBack(){
            let _this = this;
            let feedback = _this.feedback;
            if(feedback != ''){
                _this.$vux.loading.show();
                let serverIds = [];
                for(let item of _this.imgList){
                    let img = {};
                    img.serverId = item.serverId;
                    img.token = _this.wxSDK.accessToken;
                    serverIds.push(img);
                }
                let imgs = {};
                imgs.list = serverIds;
            }else{
                _this.$vux.toast.show({
                    type:'warn',
                    text: '请输入内容',
                })
            }
        }
    }
}
</script>

<style lang="less">

</style>
