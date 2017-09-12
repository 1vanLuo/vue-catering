<template>
    <div>
        <x-header :left-options="{backText: ''}" ref="hb">收货地址</x-header>
		<button class="own-login__switch" @click.prevent="toNewAddress">新增</button>
        <panel :list="addressList" :type="type" v-on:on-click-item="editAddress"></panel>
        <actionsheet v-model="showAct" :menus="menus" theme="android" @on-click-menu="clickMenu"></actionsheet>
    </div>
</template>

<script>
import XHeader from 'vux/src/components/x-header/index.vue'
import Panel from 'vux/src/components/panel/index.vue'
import Actionsheet from 'vux/src/components/actionsheet/index.vue'


export default{
    components:{
        XHeader,
        Panel,
        Actionsheet
    },
    data(){
        return{
            addressList:[],
            type:'8',
            showAct:false,
            menus:[
                {
                    label:'修改',
                    type:'primary',
                    value:'1'
                },
                {
                    label:'删除',
                    type:'warn',
                    value:'2'
                }
            ],
            item:{}
        }
    },
    created(){
        this.getAddressList();
    },
    methods:{
        getAddressList(){
            let _this = this;
            _this.$vux.loading.show({
                text: '正在加载'
            });
            ++_this.pageNo;
            setTimeout(function() {
                _this.$vux.loading.hide();
                for (let i = 1; i <= 3; i++) {
                    let o = {};
                    o.receiveMan = '张三';
                    o.phone = '18088883333';
                    o.isDefault = false;
                    o.address = 'xxx省xxx市xxx区xxx街道xxxx';
                    _this.addressList.push(o);
                }
                _this.addressList[0].isDefault = true;
            }, 1000);
        },
        toNewAddress(){
            this.$router.push({path:'/editAddress',query:{type:1}});
        },
        editAddress(item){
            let _this = this;
            //_this.showAct = true;
            _this.item = item;
            _this.$router.push({path:'/editAddress',query:{'type':2,'userAddress':_this.item}});
        },
        clickMenu(key){
            let _this = this;
            if(key == 1){
                _this.$router.push({path:'/editAddress',query:{'type':2,'userAddress':_this.item}});
            }else{
                _this.$vux.confirm.show({
                    title: '删除收货地址',
                    content: '是否确定删除该收货地址？',
                    onConfirm () {
                    }
                });
            }
        },
        goBack(){
            this.$router.push('/setting');
        }
    }
}
</script>

<style lang="less">

</style>
