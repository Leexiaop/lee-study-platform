import { lazy } from 'react';

const mainRouter = [
	{
		id: 1,
		path: '/main/module',
		name: '学习模块',
		icon: 'DatabaseOutlined',
		component: lazy(() => import('../pages/module'))
	},
	{
		id: 2,
		name: '问题列表',
		path: '/main/question',
		icon: 'InsertRowRightOutlined',
		component: lazy(() => import('../pages/question'))
	},
	{
		id: 3,
		name: '答案列表',
		path: '/main/answer',
		icon: 'InsertRowLeftOutlined',
		component: lazy(() => import('../pages/answer'))
	},
	{
		id: 4,
		name: '广告列表',
		path: '/main/ad',
		icon: 'CodeOutlined',
		component: lazy(() => import('../pages/ad'))
	}
];

export default mainRouter;
