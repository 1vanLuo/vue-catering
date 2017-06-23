//var host = 'http://192.168.0.109:8085/catering/a';
//var host = 'http://192.168.0.8:8085/catering/a';
var host = '/catering/a';
var imgHost = 'http://124.232.137.107:6660';
var testOpenId = 'oDgoQxIxHbRy0m0zYa4aSA1v6HxY';

var urls = {};
urls.banners = host + '/weixin/api/banners';
urls.product = host + '/weixin/api/products';
urls.group = host + '/weixin/api/productGroups';
urls.productDetail = host + '/weixin/api/productDetail';
urls.getWxSdk = host + '/weixin/api/wxSDK';
urls.getOpenId = host + '/weixin/api/getOpenId';
urls.login = host + '/login';
urls.scanPay = host + '/weixin/api/scanPay';
urls.getCoupons = host + '/weixin/api/getCouponListAjax';
urls.exchangeCoupon = host + '/weixin/api/couponAjaxIns';
urls.getOrderList = host + '/weixin/api/getCustOrderListBySearch';
urls.saveEvaluate = host + '/weixin/api/evaluate';
urls.cartSave = host + '/weixin/api/cartInsert';
urls.sendCaptcha = host + '/weixin/wxUser/mobileCode';
urls.checkCaptcha = host + '/weixin/wxUser/checkMobileCode';
urls.register = host + '/weixin/wxUser/registerSave';
urls.getUser = host + '/weixin/wxUser/personMes';
urls.getCarts = host + '/weixin/api/getCarts';
urls.getVipCards = host + '/weixin/api/vipCardList';
urls.updatePass = host + '/weixin/wxUser/updatePassword';
urls.setGesture = host + '/weixin/wxUser/saveGesturePwd';
urls.valiPhoe = host + '/weixin/wxUser/validPhone';
urls.resetPwd = host + '/weixin/wxUser/resetPwd';
urls.recharge = host + '/weixin/api/recharge';
urls.getVipCombos = host + '/weixin/api/vipCardCombo';
urls.saveOrder = host + '/weixin/api/orderInsert';
urls.delCart = host + '/weixin/api/cartDelete';

var postOpt = {
	emulateJSON: true,
}

var cookie = {
    set:function(key,val,time){//设置cookie方法
        var date=new Date(); //获取当前时间
        var expiresDays=time;  //将date设置为n天以后的时间
        date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间
        document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
    },
    get:function(key){//获取cookie方法
        /*获取cookie参数*/
        var getCookie = document.cookie.replace(/[ ]/g,"");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
        var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        var tips;  //声明变量tips
        for(var i=0;i<arrCookie.length;i++){   //使用for循环查找cookie中的tips变量
            var arr=arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
            if(key==arr[0]){  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                tips=arr[1];   //将cookie的值赋给变量tips
                break;   //终止for循环遍历
            }
        }
        return tips;
    },
    delete:function(key){ //删除cookie方法
        var date = new Date(); //获取当前时间
        date.setTime(date.getTime()-10000); //将date设置为过去的时间
        document.cookie = key + "=v; expires =" +date.toGMTString();//设置cookie
    }
}

var getNowDateTime = function(){
	var  nowTime = new Date();
	var  year = nowTime.getFullYear(); // 年
	var  month = nowTime.getMonth() + 1; // 月
	var  day = nowTime.getDate(); // 日
	var  hh = nowTime.getHours(); // 时
	var  mm = nowTime.getMinutes(); // 分
	var  ss = nowTime.getSeconds(); // 秒
	var  clock = year + "-";

	if (month < 10)
		clock += "0";

	clock += month + "-";

	if (day < 10)
		clock += "0";

	clock += day + " ";

	if (hh < 10)
		clock += "0";

	clock += hh + ":";
	if (mm < 10)
		clock += '0';
	clock += mm +":";
	
	if (ss < 10)
		clock += '0';
	clock += ss ;
	
	
	return clock;
}

var errorCallBack = function(res,_vux){
	_vux.alert.hide();
	_vux.loading.hide();
	_vux.toast.hide();
	var status = res.status;
	if(status == 404){
		_vux.alert.show({
		  title: '',
		  content: '<img src="../../static/images/404.jpg" width="100%">',
		  onShow:function(){
		  },
		  onHide:function(){
		  }
		});
	}else if(status == 500){
		_vux.alert.show({
		  title: '',
		  content: '<img src="../../static/images/500.jpg" width="100%">',
		  onShow:function(){
		  },
		  onHide:function(){
		  }
		});
	}else{
		_vux.alert.show({
		  title: status,
		  content: '哎呀，出错了！',
		  onShow:function(){
		  },
		  onHide:function(){
		  }
		});
	}
}

var trimStr = function(str){return str.replace(/(^\s*)|(\s*$)/g,"");}

var mergeCart = function(cart){
	var _cart = [];
	console.log('----cart----');
	console.log(cart);
	for(var  i=0; i<cart.length; i++){
		var  item = cart[i];
		var j = 0;
		var flag = false;
		for(j=0; j<_cart.length; j++){
			if(_cart[j].id === item.id){
				flag = true;
				break;
			}
		}
		if(flag){
			++_cart[j].value;
			_cart[j].sum = _cart[j].value * _cart[j].price;
		}else{
			_cart.push(item);
		}
	}
	return _cart;
}

module.exports.imgHost = imgHost;
module.exports.host = host;
module.exports.urls = urls;
module.exports.cookie = cookie;
module.exports.getNowDateTime = getNowDateTime;
module.exports.errorCallBack = errorCallBack;
module.exports.trimStr = trimStr;
module.exports.postOpt = postOpt;
module.exports.testOpenId = testOpenId;
module.exports.mergeCart = mergeCart;
