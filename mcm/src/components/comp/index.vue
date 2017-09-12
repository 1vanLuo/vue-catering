<template>
  <div class="weui-panel weui-panel_access">
    <div class="weui-panel__hd" v-if="header" @click="onClickHeader" v-html="header"></div>
    <div class="weui-panel__bd">
      <!--type==='1'-->
      <template v-if="type === '1'">
        <a :href="getUrl(item.url)" v-for="item in list" @click.prevent="onItemClick(item)" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd" v-if="item.src">
            <img class="weui-media-box__thumb" :src="item.src" alt="">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">{{item.title}}</h4>
            <p class="weui-media-box__desc">{{item.desc}}</p>
          </div>
        </a>
      </template>
      <!--type==='2'-->
      <template v-if="type === '2'">
        <div class="weui-media-box weui-media-box_text" v-for="item in list" @click.prevent="onItemClick(item)">
            <h4 class="weui-media-box__title">{{item.title}}</h4>
            <p class="weui-media-box__desc">{{item.desc}}</p>
        </div>
      </template>
      <!--type==='3'-->
      <template v-if="type === '3'">
        <div class="weui-media-box weui-media-box_small-appmsg">
            <div class="weui-cells">
              <a class="weui-cell weui-cell_access" :href="getUrl(item.url)" v-for="item in list" @click.prevent="onItemClick(item)">
                <div class="weui-cell__hd">
                  <img :src="item.src" alt="" style="width:20px;margin-right:5px;display:block">
                </div>
                <div class="weui-cell__bd">
                  <p>{{item.title}}</p>
                </div>
                <span class="weui-cell__ft"></span>
              </a>
            </div>
        </div>
      </template>
      <!--type==='4'-->
      <template v-if="type === '4'">
        <a :href="getUrl(item.url)" v-for="item in list" @click="onItemClick(item)" class="type4 weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd" v-if="item.img">
            <img class="weui-media-box__thumb" :src="item.img" alt="">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">{{item.name}}</h4>
            <p class="weui-media-box__desc" v-html="item.desc"></p>
            <div class="weui-media-box__price-btn">
            	<span class="weui-media-box__price"><i class="own-moneysmbol"></i>{{item.price}}</span>
            	<span class="weui-media-box__vipPrice">会员价:&yen;{{item.vipPrice}}</span>
            	<button class="weui-media-box__btn" @click.stop="onBtnClick(item)">来一份</button>
            	<div class="clearfix"></div>
            </div>
          </div>
        </a>
      </template>
      <!--type==='5'-->
      <template v-if="type === '5'">
        <a :href="getUrl(item.url)" v-for="(item,index) in list" @click.prevent="onItemClick(item)" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd" v-if="item.img">
            <img class="weui-media-box__thumb" :src="item.img" alt="">
          </div>
          <div class="weui-media-box__bd">
            <div>
            	<div class="weui-media-box__title" style="float: left;max-width: 85%;text-overflow : ellipsis;overflow:hidden;">{{item.name}}</div>
            	<icon type="cancel" style="float:right;font-size:1.3rem;" @click.native="delItem(index)"></icon>
            	<div class="clearfix"></div>
            </div>
            <p class="weui-media-box__desc" v-html="item.desc"></p>
            <div >
            	<div class="weui-media-box__price"><i class="own-moneysmbol"></i>{{item.price}}</div>
            	<span class="weui-media-box__vipPrice">会员价:&yen;{{item.vipPrice}}</span>
            	<div @click.prevent="add(index)" class="own-xnumber__btn">+</div>
            	<input ref="num" class="own-xnumber__ipt" readonly="readonly" v-model.number="item.num" pattern="[0-9]*" type="number" min="1"/>
		        <div @click.prevent="sub(item,index)" class="own-xnumber__btn">-</div>
		        <!--<icon type="cancel" style="float:right" @click.native="delItem(index)"></icon>-->
		        <div class="clearfix"></div>
            </div>
          </div>
        </a>
      </template>
      <!--type==='6'-->
      <template v-if="type === '6'">
        <div style="padding:10px;box-sizing:border-box;border-bottom:1px solid #eee" v-for="(item,index) in list" @click="onItemClick(item)">
            <div>
                <img :src="item.img" style="width:16vw;height:16vw;float:left">
                <div style="float:left;width:76%">
                    <div style="font-size:1.1rem;font-weight:bold;padding:0 5px;overflow: hidden;
                    text-overflow:ellipsis;white-space: nowrap;">{{item.name}}</div>
                    <div style="padding:5px;width:100%;font-size:0.7rem;font-weight:400;
                    line-height:1.1;word-break:break-all;color:#bbb" v-html="item.desc"></div>
                    <div style="padding:0 5px 5px 5px;width:100%;font-size:0.7rem;font-weight:400;
                    line-height:1.1;word-break:break-all;color:#000">月售{{item.sales}}份</div>
                    <div style="font-size:1.2rem;color:#FF563C;font-weight:bold;">
                        <i class="own-moneysmbol"></i><span>{{item.price}}</span>
                        <div style="float:right;font-weight:bold" @click.stop="add6(item,index)">
                          <x-icon type="ios-plus" size="25"></x-icon>
                        </div>
                        <!-- <div @click.prevent="add(index)" class="own-xnumber__btn">+</div> -->
                        <input ref="num6" v-show="item.isShow" class="own-xnumber__ipt_new" readonly="readonly" 
                          v-model.number="item.num" pattern="[0-9]*" type="number" min="0"/>
                        <div v-show="item.isShow" @click.stop="sub6(item,index)" class="own-xnumber__btn_new" style="display:none" ref="red6">
                          <x-icon type="ios-minus-outline" size="25"></x-icon>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
      </template>
      <!--type==='7'-->
      <template v-if="type === '7'">
        <div style="padding:10px;box-sizing:border-box;border-bottom:1px solid #eee" v-for="(item,index) in list" 
          @click.stop="onItemClick(item)">
            <div>
                <img :src="item.img" style="width:20vw;height:20vw;float:left">
                <div style="float:left;width:73%">
                    <div style="font-size:1.1rem;font-weight:bold;padding:0 0 0 5px;overflow: hidden;
                    text-overflow:ellipsis;white-space: nowrap;line-height:1.1rem;">
                      <div style="float:left;width:73%;text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">{{item.name}}</div>
                      <!-- <div style="float:left;width:25%;color:#ff563c;text-align:right">&yen;{{item.price}}</div> -->
                      <div class="clearfix"></div>
                    </div>
                    <div style="padding:5px;width:100%;font-size:0.8rem;font-weight:400;
                    line-height:1.1;word-break:break-all;color:#666;
                    text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">{{item.desc}}</div>
                    <div style="padding:5px;font-size:0.8rem;font-weight:400;
                      line-height:1.1;word-break:break-all;color:#000;">
                      <div style="float:left;">月售{{item.sales}}份</div>
                      <div style="float:right;color:#bbb">{{item.dis}}km</div>
                      <div class="clearfix"></div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
      </template>
      <!--type==='8'-->
      <template v-if="type === '8'">
        <div style="padding:10px;box-sizing:border-box;border-bottom:1px solid #eee" v-for="(item,index) in list" 
          @click.stop="onItemClick(item)">
            <div>
                <div style="font-size:1rem;line-height:2rem">
                  <span>{{item.receiveMan}}</span>
                  <span style="margin-left:5px">{{item.phone}}</span>
                  <span v-show="item.isDefault" 
                    style="margin-left:5px;color:#fff;background-color:#ff563c;padding:3px 5px;font-size:0.75rem">默认</span>
                </div>
                <div style="color:#aaa;font-size:0.8rem;line-height:1.2rem">
                    {{item.address}}
                </div>
            </div>
        </div>
      </template>
      <!--type==='9'-->
      <template v-if="type === '9'">
        <a :href="getUrl(item.url)" v-for="item in list" @click="onItemClick(item)" class="type4 weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd" v-if="item.img">
            <img class="weui-media-box__thumb" :src="item.img" alt="">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">{{item.name}}</h4>
            <p class="weui-media-box__desc" v-html="item.desc"></p>
            <div class="weui-media-box__price-btn">
            	<span class="weui-media-box__price"><i class="own-moneysmbol"></i>{{item.price}}</span>
            	<span class="weui-media-box__vipPrice">会员价:&yen;{{item.vipPrice}}</span>
            	<button class="weui-media-box__btn" @click.stop="onBtnClick(item)">购买</button>
            	<div class="clearfix"></div>
            </div>
          </div>
        </a>
      </template>
      <!--type==='10'-->
      <template v-if="type === '10'">
        <a :href="getUrl(item.url)" v-for="item in list" @click="onItemClick(item)" class="type4 weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd" v-if="item.img">
            <img class="weui-media-box__thumb" :src="item.img" alt="">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">{{item.name}}</h4>
            <p class="weui-media-box__desc" v-html="item.desc"></p>
            <div class="weui-media-box__price-btn">
            	<span class="weui-media-box__price"><i class="own-moneysmbol"></i>{{item.price}}</span>
            	<span class="weui-media-box__vipPrice">会员价:&yen;{{item.vipPrice}}</span>
            	<div class="clearfix"></div>
            </div>
          </div>
        </a>
      </template>
    </div>
    <div class="weui-panel__ft">
      <a class="weui-cell weui-cell_access weui-cell_link" :href="getUrl(footer.url)" v-if="footer && type !== '3'" @click.prevent="onClickFooter">
        <div class="weui-cell__bd" v-html="footer.title"></div>
      </a>
    </div>
  </div>
</template>

<script>
import { go, getUrl } from '../../libs/router'
import {Icon, XNumber} from 'vux'

export default {
	components: {
		Icon,
		XNumber
	},
  props: {
    header: String,
    footer: Object,
    list: Array,
    carts:Array,
    type: {
      type: String,
      default: '1'
    }
  },
  created(){
  },
  mounted(){
  },
  methods: {
    getUrl (url) {
      return getUrl(url, this.$router)
    },
    onClickFooter () {
      this.$emit('on-click-footer')
      go(this.footer.url, this.$router)
    },
    onClickHeader () {
      this.$emit('on-click-header')
    },
    onItemClick (item) {
      this.$emit('on-click-item', item)
    },
    add(index){
    	this.$emit('on-click-add',index);
    },
    sub(item,index){
    	if(item.num > 1){
        this.$emit('on-click-red',index);
    	}
    },
    add6(item,index){
      this.$emit('on-click-add',index);
      item.isShow = true;
    },
    sub6(item,index){
    	if(item.num > 0){
        if(item.num == 1){
          item.isShow = false;
        }
        this.$emit('on-click-red',index);
    	}
    },
    delItem(index){
    	this.$emit('on-click-del',index);
    },
    onBtnClick(item){
    	this.$emit('on-click-btn', item);
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_cell/weui_cell_global';
@import '../../styles/weui/widget/weui_cell/weui_access';
@import '../../styles/weui/widget/weui_panel/weui_panel';
@import '../../styles/weui/widget/weui_media_box/weui_media_box';

.weui-panel .weui-cell:first-child:before {
  display: block;
}
.own-xnumber__btn{
	height: 1.6rem;
	width: 1.6rem;
	border: 1px solid #ccc;
	color: #000;
	font-size: 1.2rem;
	line-height: 1.3rem;
	text-align: center;
	float: right;
	box-sizing: border-box;
}
.own-xnumber__btn_new{
	float: right;
}
.own-xnumber__ipt{
	height: 1.6rem;
	width: 2.5rem;
	border: none;
	color: #000;
	font-size: 1rem;
	line-height: 1.6rem;
	text-align: center;
	float: right;
	border-top: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
	box-sizing: border-box;
	border-radius: 0;
}
.own-xnumber__ipt_new{
	height: 1.6rem;
	width: 1.7rem;
	border: none;
	color: #000;
	font-size: 1rem;
	line-height: 1.6rem;
	text-align: center;
	float: right;
	box-sizing: border-box;
}
.vux-x-icon {
  fill: #3190e8;
}
</style>
