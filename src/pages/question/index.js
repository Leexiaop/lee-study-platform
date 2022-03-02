import { useState, useEffect } from 'react';
import {
	Form,
	Button,
	Select,
	Divider,
	Table,
	Space,
	Modal,
	Input,
	Drawer,
	Card,
	message
} from 'antd';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import api from '../../assets/api/api';
import url from '../../assets/api/url';
import './index.scss';

const { Option } = Select;
const { Column } = Table;

const QuestionList = () => {
	const [form] = Form.useForm();
	const [query, setQuery] = useState({});
	const [total, setTotal] = useState(0);
	const [current, setCurrent] = useState(1);
	const [size, setSize] = useState(10);
	const [moduleList, setModuleList] = useState([]);
	const [answerList, setAnswerList] = useState([]);
	const [dataList, setDataList] = useState([]);
	const [param, setParam] = useState({});
	const [isShow, setShow] = useState(false);
	const [isDrawerShow, setDrawerShow] = useState(false);
	useEffect(() => {
		form.resetFields();
	}, [isShow]);
	useEffect(async () => {
		const { data } = await api.get(url.studyModule);
		setModuleList(data);
	}, []);
	const initData = async () => {
		const { data } = await api.get(url.question, { ...query, current, size });
		setDataList(data?.list?.map((item, index) => {
			return {
				key: index + 1,
				id: item.id,
				question: item.question,
				moduleName: moduleList.find((module) => module.id === item.module)?.name,
				module: item.module,
				answerList: item.answerList,
				online: item.online
			};
		}));
		setTotal(data.total);
	};
	useEffect(async () => {
		if (moduleList.length) {
			initData();
		}
	}, [moduleList, query, current, size]);
	const onAddClick = (question) => {
		setShow(true);
		if (question.id) {
			setParam({ ...param, ...question });
			return;
		}
		setParam({});
	};
	const onQuestionDelete = (value) => {
		Modal.confirm({
			content: '您确定要删除吗？',
			okText: '是的',
			cancelText: '等会儿，我再想想！',
			onOk: async () => {
				await api.delete(`${url.question}/${value.id}`);
				initData();
			}
		});
	};
	const onQuestionOperate = async (question) => {
		await api.put(url.questionOnline, { id: question.id, online: question.online ? 0 : 1 });
		initData();
	};
	const handleCancel = () => {
		setShow(false);
		setParam({});
	};
	const handleSubmit = async (value) => {
		if (param.id) {
			value.id = param.id;
		}
		await api[param.id ? 'put' : 'post'](url.question, value);
		setParam({});
		initData();
		setShow(false);
	};
	const onAnswerCheck = (record) => {
		if (!record.answerList || !record.answerList.length) {
			message.warning('请先添加答案');
			return false;
		}
		setAnswerList([...answerList, ...record.answerList]);
		setDrawerShow(true);
		return true;
	};
	const onDrawerClose = () => {
		setDrawerShow(false);
		setAnswerList([]);
	};
	const onSearch = (value) => {
		setQuery({ ...query, ...value });
	};
	const onReset = () => {
		setQuery({});
	};
	return (
		<>
			<Form layout="inline" form={form} initialValues={query} onFinish={onSearch}>
				<Form.Item>
					<Button type="primary" htmlType="button" onClick={onAddClick}>添加</Button>
				</Form.Item>
				<Form.Item name="moduleId">
					<Select style={{ width: 200 }} placeholder="请选择模块">
						{
							moduleList.map((module) => {
								return <Option value={module.id} key={module.id}>{module.name}</Option>;
							})
						}
					</Select>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">搜索</Button>
				</Form.Item>
				<Form.Item>
					<Button type="default" htmlType="reset" onClick={onReset}>重置</Button>
				</Form.Item>
			</Form>
			<Divider />
			<Table
				bordered
				pagination={{
					total,
					pageSize: size,
					showSizeChanger: true,
					showTotal: () => `共计${total}条`,
					onShowSizeChange: (_, pageSize) => setSize(pageSize),
					onChange: (cur) => setCurrent(cur)
				}}
				dataSource={dataList}
			>
				<Column title="序号" dataIndex="key" key="key" align="center" />
				<Column title="所属模块" dataIndex="moduleName" key="moduleName" align="center" />
				<Column title="问题" dataIndex="question" key="question" align="center" />
				<Column
					title="答案数量"
					align="center"
					render={(record) => (<a onClick={() => onAnswerCheck(record)}>{record?.answerList?.length}</a>)}
				/>
				<Column
					title="操作"
					key="action"
					align="center"
					render={(record) => (
						<Space size="middle">
							<Button
								onClick={() => onAddClick(record)}
								type="primary"
								size="small"
							>
								编辑问题
							</Button>
							<Button
								onClick={() => onQuestionOperate(record)}
								type="primary"
								size="small"
								ghost
							>
								{ record.online ? '下线' : '上线' }
							</Button>
							<Button
								onClick={() => onQuestionDelete(record)}
								type="default"
								danger
								size="small"
							>
								删除
							</Button>
						</Space>
					)}
				/>
			</Table>
			<Modal
				title={param.id ? '编辑' : '添加'}
				getContainer={false}
				destroyOnClose
				visible={isShow}
				onCancel={handleCancel}
				maskClosable={false}
				footer={false}
			>
				<Form
					form={form}
					preserve={false}
					onFinish={handleSubmit}
					layout="horizontal"
					initialValues={param}
					labelCol={{ span: 4 }}
					style={{
						maxHeight: 600,
						overflowY: 'auto'
					}}
				>
					<Form.Item label="学习模块：" name="module" rules={[{ required: true, message: '请选择学习模块!' }]}>
						<Select style={{ width: '100%' }} placeholder="请选择模块">
							{
								moduleList.map((module) => {
									return <Option value={module.id} key={module.id}>{module.name}</Option>;
								})
							}
						</Select>
					</Form.Item>
					<Form.Item label="问题：" name="question" rules={[{ required: true, message: '请填写问题!' }]}>
						<Input placeholder="请写下您的问题" />
					</Form.Item>
					<Form.Item wrapperCol={{
						offset: 8,
						span: 16
					}}
					>
						<Space>
							<Button type="primary" htmlType="submit">确定</Button>
							<Button type="default" htmlType="button" onClick={handleCancel}>取消</Button>
						</Space>
					</Form.Item>
				</Form>
			</Modal>
			<Drawer
				title="查看答案"
				width={800}
				visible={isDrawerShow}
				onClose={onDrawerClose}
			>
				<Space direction="vertical" style={{ width: '100%' }}>
					{
						answerList.map((answer, index) => {
							return (
								<Card
									title={`答案${index + 1}:`}
									style={{ width: '100%' }}
									key={`答案${index + 1}`}
								>
									<ReactMarkdown
										children={answer.answer}
										components={{
											code({
												node, inline, className, children, ...props
											}) {
												const match = /language-(\w+)/.exec(className || '');
												return !inline && match ? (
													<SyntaxHighlighter
														children={String(children).replace(/\n$/, '')}
														style={dark}
														language={match[1]}
														PreTag="div"
														{...props}
													/>
												) : (
													<code className={className} {...props}>
														{children}
													</code>
												);
											}
										}}
									/>
								</Card>
							);
						})
					}
				</Space>
			</Drawer>
		</>
	);
};

export default QuestionList;
