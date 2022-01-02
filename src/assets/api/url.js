// const url = 'http://localweb.baidu.com:8532';
let url = window.location.href;
switch (process.env.NODE_ENV) {
	case 'development':
		// url = 'http://localweb.baidu.com/api';
		url = 'http://180.76.186.226/api/';
		break;
	default:
		url = `${window.location.origin}/api/`;
}
export default {
	// 登录及用户信息相关
};
