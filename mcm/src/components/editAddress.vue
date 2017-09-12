<template>
    <div>
        <x-header :left-options="{backText: ''}" ref="hb">{{title}}</x-header>
        <button class="own-login__switch" @click.prevent="del" v-show="isShowDel">删除</button>
        <group>
            <x-input title="收货人" type="text" v-model="userAddress.receiveMan"></x-input>
            <x-input title="联系电话" type="text" v-model="userAddress.phone"></x-input>
        </group>
        <group title="详细地址">
            <x-textarea name="remark" v-model="userAddress.address"></x-textarea>
        </group>
        <group>
            <x-switch title="设为默认" prevent-default v-model="userAddress.isDefault"></x-switch>
        </group>
        <button class="own-login__btn" style="margin-bottom: 20px;" @click.stop="saveAddress" disabled>保存</button>
    </div>
</template>

<script>
import XHeader from 'vux/src/components/x-header/index.vue'
import Group from 'vux/src/components/group/index.vue'
import XInput from 'vux/src/components/x-input/index.vue'
import XTextarea from 'vux/src/components/x-textarea/index.vue'
import XSwitch from 'vux/src/components/x-switch/index.vue'


export default{
    components:{
        XHeader,
        Group,
        XInput,
        XTextarea,
        XSwitch
    },
    data(){
        return{
            type:'',
            title:'',
            userAddress:{
                receiveMan:'',
                phone:'',
                address:'',
                isDefault:false
            },
            isShowDel:false
        }
    },
    created(){
        this.type = this.$route.query.type;
        if(this.type == 1){
            this.title = '新建收货地址'
        }else{
            this.userAddress = this.$route.query.userAddress;
            this.title = '修改收货地址';
            this.isShowDel = true;
        }
    },
    methods:{
        saveAddress(){
            let _this = this;
            let userAddress = _this.userAddress;
            let isDefault = userAddress.isDefault;
            if(isDefault){
                userAddress.isDefault = 1;
            }else{
                userAddress.isDefault = 0;
            }
            if(_this.COM.trimStr(userAddress.receiveMan) == ''){
                _this.$vux.alert.show({
                    content:'收货人不能为空！'
                });
                return;
            }
            if(_this.COM.trimStr(userAddress.phone) == ''){
                _this.$vux.alert.show({
                    content:'联系电话不能为空！'
                });
                return;
            }
            if(_this.COM.trimStr(userAddress.address) == ''){
                _this.$vux.alert.show({
                    content:'详细地址不能为空！'
                });
                return;
            }
            _this.$vux.loading.show();
        },
        del(){
            let _this = this;
            _this.$vux.confirm.show({
                    title: '删除收货地址',
                    content: '是否确定删除该收货地址？',
                    onConfirm () {
                        _this.$vux.confirm.hide();
                    }
                });
        }
    }
}
</script>

<style lang="less">

</style>