
//路由能查询到的公司
export const ROUTE_EXPRESS_COMPONEY = [
{name:'顺丰快递',code:'SF'},
{name:'中通快递',code:'ZTO'},
{name:'申通快递',code:'STO'},
{name:'韵达快递',code:'YD'},
{name:'天天快递',code:'HHTT'},
{name:'EMS',code:'EMS'},
{name:'圆通快递',code:'YTO'},
{name:'百世汇通',code:'HTKY'},
{name:'全峰快递',code:'QFKD'},
{name:'快捷速递',code:'FAST'},
{name:'国通快递',code:'GTO'}];

//我的收件-改变取件方式-晚间配送时间点
export const NIGHT_DELIVER_OPTION = [{value:'晚间：17：00-18：00',label: '晚间：17：00-18：00'},{value:'晚间：18：00-19：00',label: '晚间：19：00-19：00'},{value:'晚间：19：00-20：00',label: '晚间：19：00-20：00'}];


//接口API
export const API = {
	//获取User
	getUser: '/mock/gettoken',
	//获取路由信息
	getRoute: '/mock/getroute',
	//获取验证码
	getCode:'/mock/getcode',
	//获取我的收件列表
	getArriveList:'/mock/getarrivelist',
	//获取快件记录的log
	getLog:'/mock/getlog',
	//改变取件方式
	changeWay:'/mock/changeway',
	//获取地址列表
	getAddrList:'/mock/getaddrlist',
	//删除地址
	delAddr:'/mock/deladdr',
	//增加修改地址
	editAddr:'/mock/editaddr',
	//获取区域信息
	getArea:'/mock/getarea'
};

//服务器错误提示
export const SERVER_ERR_TIP = '服务器开小差了哦，请稍后再试！';


//code_map
export const CODE_MAP = {
	'-1':{msg:'非微信操作',pass:false},
	'-2':{msg:'页面授权码code失效，请重新打开',pass:false},
	'-3':{msg:'页面授权无响应，请重新打开',pass:false},
	'0':{msg:'操作成功',pass:true},
	'1':{msg:'用户不存在',pass:true},
	'2':{msg:'未绑定手机',pass:false},
	'3':{msg:'参数错误',pass: false},
	'4':{msg:'登录过期，请刷新一下哦',pass:false},
	'5':{msg:'操作失败，请再尝试一下哦',pass:false},
	'11':{msg:'用户名或密码错误',pass:false},
	'12':{msg:'手机号未绑定',pass:false},
	'13':{msg:'手机号已被绑定',pass:false},
	'21':{msg:'请先发送验证码',pass:false},
	'22':{msg:'验证码已过期，请重新获取',pass:false},
	'23':{msg:'验证吗错误',pass:false},
	'24':{msg:'验证码失效，请重新发送',pass:false},
	'31':{msg:'未认证骑士',pass:false},
	'32':{msg:'运单信息错误',pass:false},
	'33':{msg:'门店信息错误',pass:false},
	'34':{msg:'地址信息错误',pass:false},
	'35':{msg:'寄件已经受理，无法删除哦',pass:false},
	'36':{msg:'预约收件方式不能改变',pass:false},
	'37':{msg:'根据验证码签收失败',pass:false}
}

//cookie保存时间
export const COOKIETIME = 2 * 60 * 60 * 1000;
export const COOKIE_NAME_TOKEN = 'JIPEI_USER_TOKEN';
export const COOKIE_NAME_TEL = 'JIPEI_USER_TEL';


//收件项目状态map
export function STATE_MAP(state,time){
	var map = {'0':'请到店取件',
	'1':'小伙伴代拿快件',
	'2':'隔天取件',
	'3':'即将为你派件',
	'4':'正在为您派件',
	'5':'将于晚间'+time+'为你配送'}
	return map[state];
}
