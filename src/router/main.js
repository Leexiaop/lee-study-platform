import { lazy } from 'react';

const mainRouter = [
	{
		id: 1,
		path: '/main/study-module',
		name: '学习模块',
		icon: 'DatabaseOutlined',
		component: lazy(() => import('../pages/study-module'))
	},
	{
		id: 2,
		name: '问题列表',
		path: '/main/question-list',
		icon: 'InsertRowRightOutlined',
		component: lazy(() => import('../pages/question-list'))
	},
	{
		id: 3,
		name: '答案列表',
		path: '/main/answer-list',
		icon: 'InsertRowLeftOutlined',
		component: lazy(() => import('../pages/answer-list'))
	},
	{
		id: 4,
		name: '广告列表',
		path: '/main/ad-list',
		icon: 'CodeOutlined',
		component: lazy(() => import('../pages/ad-list'))
	}
];

export default mainRouter;
