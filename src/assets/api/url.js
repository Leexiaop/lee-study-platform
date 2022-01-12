// const url = 'http://localweb.baidu.com:8532';
let url = window.location.href;
switch (process.env.NODE_ENV) {
	case 'development':
		url = 'http://127.0.0.1:5000';
		break;
	default:
		url = `${window.location.origin}/api/`;
}

export default {
	// 登录及用户信息相关
	login: `${url}/login`,
	upload: `${url}/upload`,
	studyModule: `${url}/studyModule`,
	question: `${url}/question`,
	answer: `${url}/answer`
};
