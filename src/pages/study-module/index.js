import { Table } from 'antd';
import './index.scss';

const dataList = [
	{
		id: 0,
		name: 'JavaSrcipt基础',
		src: '../../assets/images/web.jpeg'
	},
	{
		id: 1,
		name: 'HTML与CSS',
		src: '../../assets/images/web.jpeg'
	},
	{
		id: 2,
		name: 'Vue',
		src: '../../assets/images/web.jpeg'
	},
	{
		id: 3,
		name: 'React',
		src: '../../assets/images/web.jpeg'
	},
	{
		id: 4,
		name: 'Angular',
		src: '../../assets/images/web.jpeg'
	},
	{
		id: 5,
		name: '算法',
		src: '../../assets/images/web.jpeg'
	},
	{
		id: 6,
		name: '前端工程化',
		src: '../../assets/images/web.jpeg'
	},
	{
		id: 7,
		name: 'HTTP与前端安全',
		src: '../../assets/images/web.jpeg'
	},
	{
		id: 8,
		name: '微信与小程序相关',
		src: '../../assets/images/web.jpeg'
	},
	{
		id: 9,
		name: '前端状态管理',
		src: '../../assets/images/web.jpeg'
	},
	{
		id: 10,
		name: '性能优化',
		src: '../../assets/images/web.jpeg'
	},
	{
		id: 11,
		name: '工具开发与使用',
		src: '../../assets/images/web.jpeg'
	},
	{
		id: 12,
		name: '实战与Coding',
		src: '../../assets/images/web.jpeg'
	},
	{
		id: 13,
		name: 'HR与工资',
		src: '../../assets/images/web.jpeg'
	},
	{
		id: 14,
		name: '其他',
		src: '../../assets/images/web.jpeg'
	}
];

const columns = [
	{
		title: 'ID',
		dataIndex: 'id'
	},
	{
		title: '名称',
		dataIndex: 'name'
	}
];
const StudyModule = () => {
	return (
		<>
			<Table bordered source={dataList} columns={columns} />
		</>
	);
};

export default StudyModule;
