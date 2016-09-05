import {getQueryString} from '../utils';

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

// export const DEV = '1234';
// export const PRPOCESS = process.env.NODE_ENV;

//测试环境API||正式环境
export const API = process.env.NODE_ENV?{
		//获取User
		getUser: 'http://wx.ichuangwen.com/jpex/jsp/control.jsp',
		//获取路由信息
		getRoute: 'http://wx.ichuangwen.com/jpex/jsp/control.jsp',
		//获取验证码
		getCode:'http://wx.ichuangwen.com/jpex/jsp/control.jsp',
		//获取我的收件列表
		getArriveList:'http://wx.ichuangwen.com/jpex/jsp/control.jsp',
		//获取快件记录的log
		getLog:'http://wx.ichuangwen.com/jpex/jsp/control.jsp',
		//改变取件方式
		changeWay:'http://wx.ichuangwen.com/jpex/jsp/control.jsp',
		//获取地址列表
		getAddrList:'http://wx.ichuangwen.com/jpex/jsp/control.jsp',
		//删除地址
		delAddr:'http://wx.ichuangwen.com/jpex/jsp/control.jsp',
		//增加修改地址
		editAddr:'http://wx.ichuangwen.com/jpex/jsp/control.jsp',
		//获取区域信息
		getArea:'http://wx.ichuangwen.com/jpex/jsp/control.jsp',
		bind:'http://wx.ichuangwen.com/jpex/jsp/control.jsp'
	}:{
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
		getArea:'/mock/getarea',
		bind:'/mock/bind'
	};

//服务器错误提示
export const SERVER_ERR_TIP = '服务器开小差了哦，请稍后再试！';


//code_map
export const CODE_MAP = {
'-1':{msg:'非微信操作',pass:false},
'-2':{msg:'微信服务器错误，请重新打开页面哦',pass:false},//code失效
'-3':{msg:'微信服务器错误，请重新打开页面哦',pass:false},//微信服务器无响应
'0':{msg:'操作成功',pass:true},
'1':{msg:'操作失败，请再尝试一下哦',pass:false},
'2':{msg:'参数错误',pass:false},
'3':{msg:'信息错误',pass:false},
'4':{msg:'系统繁忙，请稍后再试哦',pass:false},

'5':{msg:'用户不存在',pass:false},
'6':{msg:'未绑定手机',pass:false},
'7':{msg:'登录过期，请刷新一下哦',pass:false},
'8':{msg:'token验证错误，请刷新一下哦',pass:false},

'10':{msg:'用户名或密码错误',pass:false},
'11':{msg:'手机号未绑定',pass:false},
'12':{msg:'手机号已被绑定',pass:false},

'20':{msg:'请先发送验证码',pass:false},
'21':{msg:'验证码过期，请重新获取',pass:false},
'22':{msg:'验证码错误',pass:false},
'23':{msg:'验证码失效，请重新发送',pass:false},

'30':{msg:'未认证骑士',pass:false},
'31':{msg:'运单信息错误',pass:false},
'32':{msg:'门店信息错误',pass:false},
'33':{msg:'地址信息错误',pass:false},
'34':{msg:'寄件已经受理，无法删除哦',pass:false},
'35':{msg:'预约收件方式不能改变',pass:false},
'36':{msg:'签收失败',pass:false},
'37':{msg:'滞留件不允许此操作，无法执行这个操作哦',pass:false}

}

//cookie保存时间
export const COOKIETIME = 2 * 60 * 60 * 1000;
export const COOKIE_NAME_TOKEN = 'JIPEI_USER_TOKEN';
export const COOKIE_NAME_TEL = 'JIPEI_USER_TEL';


//收件项目状态map
export function STATE_MAP(data){
	const {taskStatus,dispatchingWay,time}  = data;
	//暂时没有夜间配送的按钮，time变量暂时留着
	let state = dispatchingWay;
	if(taskStatus == '3') state = '5';//状态为即将为您配件
	var map = {'0':'请到店取件',
	'1':'小伙伴代拿快件',
	'2':'隔天取件',
	'3':'即将为你派件',
	'4':'将于晚间'+time+'为你配送',
	'5':'正在为您派件'}
	return map[state];
}

//快件状态
export const WAYBILL_STATUS = {
	DELAY:4//滞留件
};

//快件任务状态(只有更改了配送方式才会产生)
export const WAYBILL_TASK_STATUS = {
	APPLY:0,//已申请
	HAD_HANDLE:1,//已受理
	HAD_ORDER:2,//已接单
	DONGING: 3,//任务进行中
	DONE:4,//任务完成
	REJUCT:-1,//拒受理
	USER_CANCEL:-2,//用户取消
	PROBLEM_TASK:-3//问题任务
}


//client
export const CLINET = getQueryString('from');

//USER_AGENT
export const USER_AGENT = navigator.userAgent;


