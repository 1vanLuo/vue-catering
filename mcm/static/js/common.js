//const host = 'http://localhost:8085/car/a';
const host = 'http://192.168.0.109:8085/car/a';
//var host = '/catering/a';
//var host = 'http://www.autoservicewx.com/catering/a';
var imgHost = 'http://124.232.137.107:6660';

var urls = {};
urls.banners = host + '/weixin/api/banners';
urls.product = host + '/weixin/api/products';
urls.group = host + '/weixin/api/productGroups';
urls.productDetail = host + '/weixin/api/productDetail';
urls.getWxSdk = host + '/weixin/api/wxSDK';
urls.getOpenId = host + '/weixin/api/getOpenId';
urls.login = host + '/login';

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

module.exports.imgHost = imgHost;
module.exports.host = host;
module.exports.urls = urls;
module.exports.getNowDateTime = getNowDateTime;
