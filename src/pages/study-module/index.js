import { useEffect, useState } from 'react';
import {
	Table,
	Image,
	Button,
	Space,
	Form,
	Divider,
	Modal,
	Input,
	Upload
} from 'antd';
import api from '../../assets/api/api';
import url from '../../assets/api/url';
import './index.scss';

const columns = [
	{
		title: 'ID',
		dataIndex: 'id',
		align: 'center'
	},
	{
		title: '名称',
		dataIndex: 'name',
		align: 'center'
	},
	{
		title: '模块图',
		dataIndex: 'src',
		align: 'center',
		render: (src) => (<Image src={src} width={200} height={100} fallback="" />)
	},
	{
		title: '操作',
		align: 'center',
		render: () => (
			<Space>
				<Button type="primary" size="small">编辑</Button>
				<Button type="primary" size="small" danger ghost>删除</Button>
			</Space>
		)
	}
];
const StudyModule = () => {
	const [dataList, setDataList] = useState([]);
	const [isShow, setShow] = useState(false);
	const [form, setForm] = useState({
		name: 'd',
		src: 'd',
		tip: 'd'
	});
	useEffect(async () => {
		const { data } = await api.get(url.studyModule);
		setDataList(data.map((item) => {
			return {
				key: item.id,
				name: item.name,
				src: item.src,
				id: item.id
			};
		}));
	}, []);
	const onAddClick = () => {
		setShow(true);
	};
	const normFile = (e) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e?.file?.response?.data || '';
	};
	const handleSubmit = async (value) => {
		await api.post(url.studyModule, value);
		setForm({
			name: '',
			src: '',
			tip: ''
		});
		setShow(false);
	};
	const handleCancel = () => {
		setShow(false);
		setForm({
			name: '',
			src: '',
			tip: ''
		});
	};
	return (
		<>
			<Form layout="inline">
				<Form.Item>
					<Button type="primary" htmlType="button" onClick={onAddClick}>添加</Button>
				</Form.Item>
			</Form>
			<Divider />
			<Table bordered dataSource={dataList} columns={columns} />
			<Modal
				title="Modal"
				footer={null}
				visible={isShow}
			>
				<Form
					layout="horizontal"
					initialValues={form}
					onFinish={handleSubmit}
				>
					<Form.Item
						label="模块名称"
						name="name"
						rules={[
							{
								required: true,
								message: '请输入模块名称!'
							}
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="模块样图"
						name="src"
						rules={[
							{
								required: true,
								message: '请上传模块样图!'
							}
						]}
						valuePropName="fileLists"
						getValueFromEvent={normFile}
					>
						<Upload
							action="http://127.0.0.1:5000/upload"
							listType="picture"
						>
							shang
						</Upload>
					</Form.Item>
					<Form.Item
						label="模块寄语"
						name="tip"
					>
						<Input />
					</Form.Item>
					<Form.Item>
						<Space>
							<Button type="primary" htmlType="submit">确定</Button>
							<Button type="default" htmlType="button" onClick={handleCancel}>取消</Button>
						</Space>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default StudyModule;
