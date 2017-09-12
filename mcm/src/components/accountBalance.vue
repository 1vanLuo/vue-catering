<template>
    <div>
        <div class="own-ab__top" ref="topDiv">
            <div style="padding:10px">
                <i class="iconfont icon-left" style="color:#fff;font-size:1.2rem" @click="back"></i>
            </div>
            <div style="color:#fff;font-size:0.85rem;width:100%;text-align:center">账户余额</div>
            <div style="color:#fff;width:100%;text-align:center;font-size:2rem;font-weight:bold">{{totalBalance}}</div>
            <!-- <div style="color:#fff;font-size:1rem;width:100%;text-align:center;margin:15px 0 5px 0">总收益 {{totalProfit}}</div> -->
        </div>
        <scroller height="-115" lock-x @on-scroll="onScroll" ref="scroller" v-model="status" :pullup-config="pullUp" @on-pullup-loading="pullupRefresh" :use-pullup=true @on-scroll-bottom="onScrollBottom">
            <div style="padding:10px;border-bottom:1px solid #eee" v-for="i in accountCashList">
                <div>
                    <div style="float:left">
                        <div style="font-weight:bold">{{i.reason}}</div>
                        <div style="color:#999;font-size:0.8rem">{{i.createDate}}</div>
                    </div>
                    <div style="float:right;text-align:right">
                        <div style="font-weight:bold">{{i.fee}}</div>
                        <div style="color:#999;font-size:0.8rem">{{i.sumFee}}</div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
import Scroller from 'vux/src/components/scroller/index.vue'

export default {
    components: {
        Scroller
    },
    data() {
        return {
            totalBalance: 0,
            totalProfit: 0,
            pageNo: 0,
            accountId: '',
            pullUp: {
                content: '',
                pullUpHeight: 100,
                autoRefresh: false,
                downContent: '释放后加载',
                upContent: '上拉加载更多',
                loadingContent: '加载中...',
                clsPrefix: 'xs-plugin-pullup-'
            },
            status: {
                pullupStatus: 'enable'
            },
            accountCashList: [
                {
                    reason: '支出',
                    createDate: '2017-8-11 15:51:50',
                    fee: '-16.5'
                },
                {
                    reason: '支出',
                    createDate: '2017-8-11 15:51:50',
                    fee: '-16.5'
                },
                {
                    reason: '支出',
                    createDate: '2017-8-11 15:51:50',
                    fee: '-16.5'
                },
                {
                    reason: '支出',
                    createDate: '2017-8-11 15:51:50',
                    fee: '-16.5'
                },
                {
                    reason: '支出',
                    createDate: '2017-8-11 15:51:50',
                    fee: '-16.5'
                }
            ]
        }
    },
    created() {
    },
    mounted() {
        //this.pullupRefresh();
    },
    methods: {
        onScroll(pos) {
            this.scrollTop = pos.top
        },
        back() {
            this.$router.push('/personalCenter');
        },
        onScrollBottom() {
            if (this.status.pullupStatus == 'disabled') {
                this.$vux.toast.show({
                    type: 'text',
                    text: '没有更多数据了',
                    position: 'bottom'
                })
            }
        },
        pullupRefresh() {
            let _this = this;
            _this.$vux.loading.show({
                text: '正在加载'
            });
            ++_this.pageNo;
            setTimeout(function() {
                _this.$vux.loading.hide();
                for (let i = 1; i <= 10; i++) {
                    let o = {};
                    o.reason = '支出';
                    o.createDate = '2017-8-11 15:51:50';
                    o.fee = '-16.5';
                    _this.accountCashList.push(o);
                }
                _this.$nextTick(() => {
                    let sc = _this.$refs.scroller;
                    sc.reset();
                });
                _this.status.pullupStatus = 'enabled';
            }, 1000);
        }
    }
}
</script>

<style lang="less">

</style>


