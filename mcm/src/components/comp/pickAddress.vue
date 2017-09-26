<template>
    <div v-transfer-dom>
        <popup v-model="showPop" height="100%" @on-first-show="resetScroller">
            <div style="background-color:#efefef;height:100%">
                <div class="own-yiye__top" ref="topDiv">
                    <input class="own-yiye__top-search" placeholder="搜索城市" v-model="search"
                    @keyup="searchCity()">
                    <span style="color:#fff;font-size:1rem;margin-left:5px" @click="hidePicker()">取消</span>
                </div>
                <scroller height="-50" lock-x @on-scroll="onScroll" ref="cityScroller">
                <div>
                <div v-show="isShowSearch">
                    <div v-for="city in this.searchCitys" style="width:100%;padding:7px 0;padding-left:4%;font-size:0.85rem;
                        border-bottom:1px solid #ddd;;background-color:#fff;box-sizing:border-box"
                            @click="showDistsSearch(city)">
                        {{city.text}}
                    </div>
                </div>
                <div v-show="isHideSearch">
                    <div v-show="showDistrict" ref="nowCity" style="font-size:0.85rem;background-color:#fff;padding:10px;border-bottom:1px solid #ddd">
                        <span>当前：{{nowCity}}</span>
                        <span style="float:right" @click="showDists()">选择区县</span>
                    </div>
                    <div style="background-color:#fff;padding:10px 0 15px 0" v-show="isShowDists">
                        <div style="margin-left:4%;width:20%;padding:7px 0;text-align:center;font-size:0.85rem;
                        border:1px solid #ddd;border-radius:3px;background-color:#fff;margin-top:5px;
                        box-sizing:border-box;float:left" @click="selDis({})">
                            全城
                        </div>
                        <div v-for="c in this.dists" style="margin-left:4%;width:20%;padding:7px 0;text-align:center;font-size:0.85rem;
                        border:1px solid #ddd;border-radius:3px;background-color:#fff;margin-top:5px;
                        box-sizing:border-box;float:left" @click="selDis(c)">
                            {{c.text}}
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div style="margin-left:4%;margin-top:10px" v-show="isShowGeo">
                        <div style="font-size:0.85rem;color:#888">定位城市</div>
                        <div style="width:20%;padding:7px 0;text-align:center;font-size:0.85rem;
                        border:1px solid #ddd;border-radius:3px;background-color:#fff;margin-top:5px;
                        box-sizing:border-box" @click="showDistsGeo()">
                            {{geoCity.name}}
                        </div>
                    </div>
                    <div style="margin-top:10px">
                        <div style="margin-left:4%;font-size:0.85rem;color:#888">热门城市</div>
                        <div v-for="c in this.commonCitys" style="margin-left:4%;width:20%;padding:7px 0;text-align:center;font-size:0.85rem;
                        border:1px solid #ddd;border-radius:3px;background-color:#fff;margin-top:5px;
                        box-sizing:border-box;float:left" @click="showDistsComm(c)">
                            {{c[1]}}
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div style="margin-top:10px">
                        <div style="margin-left:4%;font-size:0.85rem;color:#888;margin-bottom:5px;">所有城市</div>
                        <div v-for="city in this.citys" style="width:100%;padding:7px 0;padding-left:4%;font-size:0.85rem;
                        border-bottom:1px solid #ddd;;background-color:#fff;box-sizing:border-box" @click="showDistsAll(city)">
                            {{city.text}}
                        </div>
                    </div>
                </div>
                </div>
                </scroller>   
            </div>
        </popup>
    </div>
</template>

<script>
import Popup from 'vux/src/components/popup/index'
import TransferDom from 'vux/src/directives/transfer-dom'
import Scroller from 'vux/src/components/scroller/index.vue'

export default {
    directives: {
        TransferDom
    },
    components:{
        Popup,
        Scroller
    },
    props:{
        show:{
            type:Boolean,
            required:true
        },
        showDistrict:{
            type:Boolean,
            required:true
        },
        data:{
            type:Array,
            required:true,
            default () {
                return []
            }
        },
        commonCitys:{
            type:Array,
            required:true,
            default () {
                return []
            }
        },
        default:{
            type:String,
            required:false
        }
    },
    data(){
        return{
            showPop:false,
            search:'',
            citys:[],
            dists:[],
            isShowDists:false,
            geoCity:{
                name:'',
                code:''
            },
            nowCity:'',
            isHideSearch:true,
            isShowSearch:false,
            searchCitys:[],
            allArea:{},
            isShowGeo:true
        }
    },
    watch:{
        show (val) {
            this.showPop = val;
        }
    },
    created(){
        if(this.default == undefined || this.default == ''){
            this.isShowGeo = false;
        }
        this.geoCity.name = this.default;
        this.nowCity = this.geoCity.name;
        this.isShowDists = this.showDistrict;
        if (typeof this.show !== 'undefined') {
            this.showPop = this.show
        }
        for(let c of this.CityData3.citys){
            let cc = c.children;
            for(let i of cc){
                if(i.text.indexOf(this.default) >= 0){
                    this.geoCity.code = i.value;
                }
                this.citys.push(i);
            }
        } 
        this.initDists(this.geoCity.code);
    },
    mounted(){
    },
    methods:{
        resetScroller () {
            this.$nextTick(() => {
                this.$refs.cityScroller.reset();
            });
        },
        onScroll(pos) {
            this.scrollTop = pos.top
        },
        hidePicker(){
            this.$emit("on-hide",'');
        },
        showDists(){
            let is = !this.isShowDists;
            this.isShowDists = is;
        },
        showDistsGeo(){
            this.nowCity = this.geoCity.name;
            this.initDists(this.geoCity.code);
            this.isShowDists = true;
            this.$refs.cityScroller.reset({top: 0});
        },
        showDistsComm(item){
            let code = item[5];
            this.nowCity = item[1];
            this.initDists(code);
            //this.isShowDists = true;
            this.$refs.cityScroller.reset({top: 0});
        },
        showDistsAll(item){
            this.nowCity = item.text;
            this.initDists(item.value);
            //this.isShowDists = true;
            this.$refs.cityScroller.reset({top: 0});
        },
        showDistsSearch(item){
            this.nowCity = item.text;
            this.search = item.text;
            this.initDists(item.value);
            this.isHideSearch = true;
            this.isShowSearch = false;
           // this.isShowDists = true;
        },
        initDists(code){
            if(this.showDistrict){
                for(let c of this.CityData3.citys){
                    let cc = c.children;
                    for(let i of cc){
                        if(i.value == code){
                            this.allArea = i;
                            this.dists = i.children;
                            break;
                        }
                    }
                }
            }else{
                let item = {};
                item.text = this.nowCity;
                item.value = code;
                this.$emit("on-hide",item);
            }
        },
        searchCity(){
            let val = this.search;
            this.searchCitys = [];
            if(this.COM.trimStr(val) != ''){
                for(let c of this.CityData3.citys){
                    let cc = c.children;
                    for(let i of cc){
                        if(i.text.indexOf(val) >= 0){
                            this.searchCitys.push(i);
                        }
                    }
                }
                this.isHideSearch = false;
                this.isShowSearch = true;
            }else{
                this.isHideSearch = true;
                this.isShowSearch = false;
            }
            this.$refs.cityScroller.reset({top: 0});
        },
        selDis(item){
            if(JSON.stringify(item) == "{}"){
                item = this.allArea;
            }
            this.$emit("on-hide",item);
        }
    }
}
</script>

<style lang="less">

</style>
