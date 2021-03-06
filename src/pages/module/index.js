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

const Modules = () => {
	const [form] = Form.useForm();
	const [dataList, setDataList] = useState([]);
	const [isShow, setShow] = useState(false);
	const [param, setParam] = useState({});
	const [fileList, setFileList] = useState([]);
	const [size, setSize] = useState(10);
	const [current, setCurrent] = useState(1);
	const [total, setTotal] = useState(0);
	const initData = async () => {
		const { data } = await api.get(url.modules, { current, size });
		setDataList(data?.list?.map((item, key) => {
			return {
				key: key + 1,
				name: item.name,
				src: item.src,
				id: item.id,
				tip: item.tip
			};
		}));
		setTotal(data.total);
	};
	useEffect(() => {
		form.resetFields();
	}, [isShow]);
	useEffect(async () => {
		initData();
	}, [current, size]);
	const onAddClick = (value) => {
		setShow(true);
		if (value.id) {
			setParam({ ...param, ...value });
			setFileList([
				{
					url: value.src
				}
			]);
			return;
		}
		setParam({});
		setFileList([]);
	};
	const onDelectClick = async (value) => {
		Modal.confirm({
			content: '您确定要删除吗？',
			okText: '是的',
			cancelText: '等会儿，我再想想！',
			onOk: async () => {
				await api.delete(`${url.modules}/${value.id}`);
				initData();
			}
		});
	};
	const normFile = (e) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e?.file?.response || '';
	};
	const handleSubmit = async (value) => {
		if (param.id) {
			value.id = param.id;
		}
		await api[param.id ? 'put' : 'post'](url.modules, value);
		setParam({});
		setShow(false);
		initData();
	};
	const handleCancel = () => {
		setShow(false);
		setParam({});
	};
	return (
		<>
			<Form layout="inline" form={form}>
				<Form.Item>
					<Button type="primary" htmlType="button" onClick={onAddClick}>添加</Button>
				</Form.Item>
			</Form>
			<Divider />
			<Table
				bordered
				dataSource={dataList}
				pagination={{
					pageSize: size,
					current,
					total,
					showSizeChanger: true,
					showTotal: () => {
						return `共计${total}条`;
					},
					onChange: (page) => {
						setCurrent(page);
					},
					onShowSizeChange: (_, pageSize) => {
						setSize(pageSize);
					}
				}}
			>
				<Column title="序号" dataIndex="key" key="key" align="center" />
				<Column title="名称" dataIndex="name" key="name" align="center" />
				<Column title="模块图" dataIndex="src" key="src" align="center" render={(_, record) => <Image width={100} src={record.src} />} />
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
				title={param.id ? '编辑' : '添加'}
				footer={null}
				getContainer={false}
				destroyOnClose
				visible={isShow}
				onCancel={handleCancel}
				maskClosable={false}
			>
				<Form
					form={form}
					preserve={false}
					layout="horizontal"
					initialValues={param}
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
						valuePropName="src"
						getValueFromEvent={normFile}
					>
						<Upload
							defaultFileList={fileList}
							onRemove={() => {
								setParam({ ...param, ...{ src: '' } });
							}}
							customRequest={async (options) => {
								const { onSuccess, file } = options;
								const { data } = await api.upload(url.upload, file);
								onSuccess(data);
							}}
							listType="picture"
						>
							{
								param.src ? null : <Button icon={<UploadOutlined />}>上传</Button>
							}
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

export default Modules;
