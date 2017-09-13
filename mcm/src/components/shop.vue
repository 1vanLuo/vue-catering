<template>
    <div>
        <div ref="topDiv">
            <div style="background-color:#fff;padding:5px 10px">
                <i class="iconfont icon-left" style="color:#FF563C;font-size:1.2rem" @click="back"></i>
            </div>
            <panel :list="shop" :type="typeShop"></panel>
        </div>
        <div style="width:100%;float:right;background-color:#fff;height:100%" ref="psRight">
            <scroller lock-x @on-scroll="onScroll" ref="besScrollerRight" :pullup-config="pullUp" 
			@on-pullup-loading="pullupRefresh" :use-pullup=true @on-scroll-bottom="onScrollBottom">
                <div>
                    <panel :list="products" :type="type" v-on:on-click-add="addNum" v-on:on-click-red="subNum"
					 ></panel>
                </div>
            </scroller>
        </div>
        <div class="own-cart__bottom" ref="footBar">共<span ref="sumNum">{{sumNum}}</span>道菜&nbsp;&nbsp;
			<span style="color:#ff563c">合计: <i ref="sumFee" class="own-cart__sunfee">{{sumFee}}</i>元</span>
			<button class="own-cart__btn" @click.prevent="toPreOrder()">下单</button>
		</div>
    </div>
</template>

<script>
    import Scroller from 'vux/src/components/scroller/index.vue'
    import Group from 'vux/src/components/group/index.vue'
    import Cell from 'vux/src/components/cell/index.vue'
    import CellBox from 'vux/src/components/cell-box/index.vue'
    import Panel from 'vux/src/components/panel/index.vue'


    export default {
        components: {
            Scroller,
            Group,
            Cell,
            CellBox,
            Panel
        },
        data(){
            return{
                results:[],
                seaVal:'',
                type:'6',
                typeShop:'7',
                shop:[
                    {
                        id:'',
                        name:'',
                        desc:'',
                        sales:0,
                        dis:0,
                        img:''
                    }
                ],
                productGroup:[],
                cart:[],
                products:[],
                sumNum: 0,
                sumFee: 0,
                pageNo:0,
                pullUp:{
                    content: '',
                    pullUpHeight: 100,
                    height: 40,
                    autoRefresh: false,
                    downContent: '释放后加载',
                    upContent: '上拉加载更多',
                    loadingContent: '加载中...',
                    clsPrefix: 'xs-plugin-pullup-'
                },
                status:{
                    pullupStatus:'default'
                }
            }
        },
        methods:{
            pullupRefresh(){
                let _this = this;
                _this.$vux.loading.show({
                    text: '正在加载'
                });
                _this.pageNo++;
                setTimeout(function(){
                    _this.$vux.loading.hide();
                    for(let i=1; i<=10; i++){
                        let p = {};
                        p.id = (_this.pageNo - 1) * 10 + i;
                        p.name = '菜名';
                        p.desc = '菜品描述';
                        p.sales = '888';
                        p.price = '58.00';
                        p.img = 'http://data.luo1fan.com/dish.png-style1';
                        p.isShow = false;
                        p.num = 0;
                        for(let c of _this.cart){
                            if(c.id === p.id){
                                p.num = c.num;
                                p.isShow = true;
                                break;
                            }
                        }
                        _this.products.push(p);
                    }
                    _this.$nextTick(() => {
                        let tH = _this.$refs.topDiv.offsetHeight;
                        let fH = _this.$refs.footBar.offsetHeight;
                        let sc = _this.$refs.besScrollerRight;
                        sc.$el.style.height = window.innerHeight - tH -fH + 'px';
                        sc.reset();
                    });
                    _this.status.pullupStatus = 'enabled';
                },1000);
            },
            onScrollBottom(){
                if(this.status.pullupStatus == 'disabled'){
                    this.$vux.toast.show({
                        type:'text',
                        text:'没有更多数据了',
                        position:'bottom'
                    })
                }
            },
            cartSave(c){
                console.log(c)
                let _this = this;
                let para = {};
                let pr = {};
                pr.id = c.id;
                para.productRelease = pr;
                if(c.hasOwnProperty('cartId')){
                    para.cartId = c.cartId;
                }
                para.num = c.num;
                let cartId = new Date().getTime();
                let f = false;
                let len = _this.cart.length
                for(let i=0; i<len; i++){
                    let item = _this.cart[i];
                    if(item.cartId === cartId){
                        ++item.num;
                        _this.cart.splice(i,1,item);
                        f = true;
                        break;
                    }
                }
                if(!f){
                    c.cartId = cartId;
                    _this.cart.splice(len,0,c);
                }
                
                let ct = 0;
                for(let i of _this.cart){
                    ct += i.num;
                }
                console.log('=====this.cart=======')
                console.log(_this.cart);
                sessionStorage.setItem('cart',JSON.stringify(_this.cart));
                _this.countSum();
            },
            addToCart(item,f){
                console.log(item);
                let flag = false;
                let _cart = this.cart;
                console.log(_cart)
                let _c = {};
                for(let index=0; index<_cart.length; index++){
                    console.log(index);
                    let c = _cart[index];
                    if(c.id === item.id){
                        c.num += f;
                        if(c.num == 0){
                            _cart.splice(index,1);
                        }
                        flag = true;
                        break;
                    }
                }
                if(!flag){
                    _c.id = item.id;
                    _c.num = item.num;
                    _c.img = item.img;
                    _c.desc = item.desc;
                    _c.name = item.name;
                    _c.price = item.price;
                    _c.vipPrice = item.vipPrice;
                    this.cart.push(_c);
                }
                console.log('=====this.cart=======')
                console.log(this.cart);
                sessionStorage.setItem('cart',JSON.stringify(this.cart));
                this.countSum();
            },
            subCart(c){
		  	},
            onSubmit () {
                this.$refs.search.setBlur()
                this.$vux.toast.show({
                    type: 'text',
                    position: 'top',
                    text: 'on submit'
                });
            },
            onFocus () {
                console.log('on focus')
            },
            onCancel () {
                console.log('on cancel')
            },
            onScroll(pos) {
                this.scrollTop = pos.top
            },
            addNum(index){
		   		let item = this.products[index];
		   		++item.num;
                item.sum = (item.num * item.price).toFixed(2);
                this.addToCart(item,1);
                // this.countSum();
		   },
		   subNum(index){
		   		let item = this.products[index];
		   		--item.num;
                item.sum = (item.num * item.price).toFixed(2);
                for(let c of this.cart){
                    if(c.id === item.id){
                        item.cartId = c.cartId;
                        break;
                    }
                }
                this.addToCart(item,-1);    
           },
           delItem(id){
		   },
           toPreOrder(){
                if(this.cart.length > 0){
		   			sessionStorage.setItem('cart',JSON.stringify(this.cart));
		   	  		this.$router.push({path:'/preOrder1'});
		   		}else{
		   			this.$vux.toast.show({
			          text: '您还没有选择任何商品，再去逛一逛吧',
			          type: 'text',
			          width: '50%'
			        });
		   		}
		   },
           getProducts(){
           },
           back(){
               window.history.go(-1);
           },
           clickItem(item){
                this.$router.push({path:'/productView',query:{id:item.id}});
           },
           countSum(){
		   		let num = 0;
		   		let fee = 0
			   	for(let item of this.cart) {  
			   		console.log('----item----')
			   		console.log(item)
	   				num += Number(item.num);
	   				fee += Number(item.num*item.price);
				}
			   	this.sumNum = num;
			   	this.sumFee = fee;
           },
        },
        created(){
            let shop = JSON.parse(window.sessionStorage.getItem('theShop'));
            this.shop.splice(0,1);
            this.shop.push(shop);

            let carts = JSON.parse(window.sessionStorage.getItem('cart')) || []; 
            console.log(carts)
            this.cart = carts;
            this.countSum();

        },
        mounted(){
            let _this = this;
            _this.pullupRefresh();

        }
    }
</script>

<style lang="less">
    .vux-no-group-title{
        margin-top:0 !important;
    }
    .box1 {
        position: relative;
        width: auto;
        padding: 5px 0;
    }
    .own-shop__pg {
        display:inline-block;
        margin-left: 10px;
        float: left;
        text-align: center;
        width: 60px;
        line-height:2rem;
        font-size: 0.8rem;
        display:inline-block;
    }
    .own-shop__pg:first-child {
        margin-left: 0;
    }
    p{
        margin: 0;
    }
</style>