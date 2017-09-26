<template>
    <div>
        <div class="own-yiye__top" ref="topDiv">
            <div class="own-yiye__top-loc">
                <i class="iconfont icon-dingwei" style="color:#fff;margin-top:-3px;vertical-align:text-top;"></i>
                <span class="own-yiye__top-loctext" @click="showAddrPicker()">{{loc}}</span>
            </div>
            <div style="margin-top:10px;">
                <div style="float:right;width:10%;line-height:1.8rem" @click="toPersonalCenter">
                    <i class="iconfont icon-gerenzhongxin" style="color:#fff;font-size:1.5rem"></i>
                </div>
                <input class="own-yiye__top-search" placeholder="搜索商家" v-model="search">
            </div>
        </div>
        <div>
            <scroller height="-85" lock-x @on-scroll="onScroll" ref="shopScroller" v-model="status" :pullup-config="pullUp" @on-pullup-loading="pullupRefresh" :use-pullup=true @on-scroll-bottom="onScrollBottom">
                <div>
                    <panel :list="shops" :type="type" v-on:on-click-item="toShop"></panel>
                </div>
            </scroller>
        </div>
        <AddressPicker :show="isShow" :default="defaultCity" :showDistrict="showDis" :data="cityList" :commonCitys="commonCitys" v-on:on-hide="hide">

        </AddressPicker>
    </div>
</template>

<script>
import Scroller from 'vux/src/components/scroller/index.vue'
import Panel from 'vux/src/components/panel/index.vue'
import AddressPicker from './comp/pickAddress.vue'

import jQ from 'jquery'

export default {
    components: {
        Scroller,
        Panel,
        AddressPicker
    },
    data() {
        return {
            geo: {},
            defaultCity: '长沙市',
            loc: '长沙市',
            areaCode: '',
            cityList: [],
            commonCitys: this.COM.commoncitys,
            isShow: false,
            showDis: true,
            addr: ['430000', '430100', '430102'],
            search: '',
            type: '7',
            shops: [],
            wxSDK: {},
            pageNo: 0,
            groupId: '',
            prId: '',
            pullUp: {
                content: '',
                pullUpHeight: 100,
                height: 40,
                autoRefresh: false,
                downContent: '释放后加载',
                upContent: '上拉加载更多',
                loadingContent: '加载中...',
                clsPrefix: 'xs-plugin-pullup-'
            },
            status: {
                pullupStatus: 'default'
            },
        }
    },
    created() {
        this.prId = this.$route.query.productId;
        this.groupId = this.$route.query.productGroup;
        this.$vux.loading.show({
            text: '正在定位'
        });
        for (let c of this.CityData3.citys) {
            let cc = c.children;
            for (let i of cc) {
                this.cityList.push(i);
            }
        }
        let _this = this;
        let url = window.location.href;

        let count = 0;
        let flag = false;
        let t = setInterval(function() {
            ++count;
            if (count < 2) {
                if (!jQ.isEmptyObject(_this.geo)) {
                    clearInterval(t);
                }
            } else {
                flag = _this.geoAddrByIp();
                clearInterval(t);
            }
        }, 1000);
    },
    mounted() {
    },
    watch: {
        geo(val) {
            let _this = this;
            window.sessionStorage.setItem('location', JSON.stringify(val));
            let point = new BMap.Point();
            point.lat = val.lat;
            point.lng = val.lng;
            let geoc = new BMap.Geocoder();
            geoc.getLocation(point, function(rs) {
                let addComp = rs.addressComponents;
                let city = addComp.city;
                _this.loc = city;
                for (let c of _this.CityData3.citys) {
                    let cc = c.children;
                    for (let i of cc) {
                        if (i.text.indexOf(city) >= 0) {
                            _this.areaCode = i.value;
                            break;
                        }
                    }
                }
            });
        },
        areaCode(val) {
            this.shops = [];
            this.pageNo = 0;
            this.status.pullupStatus = 'enabled';
            this.pullupRefresh(0);
        }
    },
    methods: {
        pullupRefresh(flag) {
            let _this = this;
            _this.$vux.loading.show({
                text: '正在加载'
            });
            _this.pageNo++;
            setTimeout(function(){
                _this.$vux.loading.hide();
                for(let i=1; i<=10; i++){
                    let shop = {};
                    shop.id = (_this.pageNo - 1) * 10 + i;
                    shop.name = '示例店铺';
                    shop.desc = '店铺描述';
                    shop.sales = '999';
                    shop.dis = '1.45';
                    shop.img = 'http://data.luo1fan.com/dianpu.jpg-style';
                    _this.shops.push(shop);
                }
                _this.$nextTick(() => {
                    let sc = _this.$refs.shopScroller;
                    sc.reset();
                });
                _this.status.pullupStatus = 'enabled';
            },1000);
        },
        onScrollBottom() {
            if (this.status.pullupStatus == 'disabled') {
                this.$vux.toast.show({
                    type: 'text',
                    text: '没有更多了',
                    position: 'bottom'
                })
            }
        },
        getGeo() {
        },
        onScroll(pos) {
            this.scrollTop = pos.top
        },
        toShop(item) {
            window.sessionStorage.setItem('theShop',JSON.stringify(item));
            this.$router.push({ path: '/shop'});
        },
        showAddrPicker() {
            this.isShow = true;
        },
        hide(item) {
            this.isShow = false;
            if (item != '' && item != 'undefined') {
                this.loc = item.text;
                this.areaCode = item.value;
            } else {
            }
        },
        toPersonalCenter() {
            this.$router.push({ path: '/personalCenter'});
        },
        geoAddrByIp(t) {
            let flag = false;
            let _this = this;
            let geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    let bdLat = r.point.lat;
                    let bdLng = r.point.lng;
                    _this.geo = r.point;
                    flag = true;
                }
                else {
                    _this.$vux.alert.show({
                        content: '定位失败:' + this.getStatus()
                    });
                    flag = false;
                }
            }, { enableHighAccuracy: true });
            return flag;
        }
    }
}
</script>

<style lang="less">

</style>