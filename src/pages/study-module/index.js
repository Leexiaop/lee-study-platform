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
import { UploadOutlined } from '@ant-design/icons';
import api from '../../assets/api/api';
import url from '../../assets/api/url';
import './index.scss';

const { Column } = Table;

const StudyModule = () => {
	const [dataList, setDataList] = useState([]);
	const [isShow, setShow] = useState(false);
	const [form, setForm] = useState({});
	const initData = async () => {
		const { data } = await api.get(url.studyModule);
		setDataList(data.map((item, key) => {
			return {
				key: key + 1,
				name: item.name,
				src: item.src,
				id: item.id,
				tip: item.tip
			};
		}));
	};
	useEffect(async () => {
		initData();
	}, []);
	const onAddClick = (value) => {
		setShow(true);
		if (value.id) {
			setForm({ ...form, ...value });
		}
	};
	const onDelectClick = async (value) => {
		await api.delete(`${url.studyModule}/${value.id}`);
		initData();
	};
	const normFile = (e) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e?.file?.response?.data || '';
	};
	const handleSubmit = async (value) => {
		if (form.id) {
			value.id = form.id;
		}
		await api[form.id ? 'put' : 'post'](url.studyModule, value);
		setForm({});
		setShow(false);
		initData();
	};
	const handleCancel = () => {
		setShow(false);
		setForm({});
	};
	return (
		<>
			<Form layout="inline">
				<Form.Item>
					<Button type="primary" htmlType="button" onClick={onAddClick}>添加</Button>
				</Form.Item>
			</Form>
			<Divider />
			<Table bordered dataSource={dataList}>
				<Column title="序号" dataIndex="key" key="key" align="center" />
				<Column title="名称" dataIndex="name" key="name" align="center" />
				<Column title="模块图" dataIndex="src" key="src" align="center" />
				<Column title="模块寄语" dataIndex="tip" key="tip" align="center" />
				<Column
					title="操作"
					dataIndex="action"
					key="action"
					align="center"
					render={(_, record) => (
						<Space>
							<Button type="primary" size="small" onClick={() => onAddClick(record)}>编辑</Button>
							<Button type="primary" size="small" danger ghost onClick={() => onDelectClick(record)}>删除</Button>
						</Space>
					)}
				/>
			</Table>
			<Modal
				title={form.id ? '编辑' : '添加'}
				footer={null}
				visible={isShow}
				onCancel={handleCancel}
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
							<Button icon={<UploadOutlined />}>上传</Button>
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
