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
import MarkdownEditor from '@uiw/react-markdown-editor';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import api from '../../assets/api/api';
import url from '../../assets/api/url';
import './index.scss';

const { Option } = Select;
const { Column } = Table;

const markdown = "## Install\n\n```bash\nnpm i @uiw/react-markdown-editor\n```\n\n## Document\n\nOfficial document [demo preview](https://uiwjs.github.io/react-markdown-editor/) ([🇨🇳中国镜像网站](http://uiw.gitee.io/react-markdown-editor/))\n\n## Basic Usage\n\n```jsx\nimport MarkdownEditor from '@uiw/react-markdown-editor';\nimport React from 'react';\nimport ReactDOM from 'react-dom';\n\nconst Dome = () => (\n  <MarkdownEditor\n    value={this.state.markdown}\n    onChange={this.updateMarkdown}\n  />\n);\n\nReactDOM.render(<Dome />, document.getElementById('app'));\n```";

const QuestionList = () => {
	const [form] = Form.useForm();
	const [query, setQuery] = useState({});
	const [moduleList, setModuleList] = useState([]);
	const [answerList, setAnswerList] = useState([]);
	const [checkAnswerList, setCheckAnswerList] = useState([]);
	const [dataList, setDataList] = useState([]);
	const [param, setParam] = useState({});
	const [questionId, setQuestionId] = useState(0);
	const [isShow, setShow] = useState(false);
	const [isDrawerShow, setDrawerShow] = useState(false);
	const [isHas, setHas] = useState(false);
	useEffect(() => {
		form.resetFields();
	}, [isShow]);
	useEffect(async () => {
		const { data } = await api.get(url.studyModule);
		setModuleList(data);
	}, []);
	const initData = async () => {
		const { data } = await api.get(url.question);
		setDataList(data.map((item, index) => {
			return {
				key: index + 1,
				id: item.id,
				question: item.question,
				moduleName: moduleList.find((module) => module.id === item.module)?.name,
				module: item.module,
				answerList: item.answerList
			};
		}));
	};
	useEffect(async () => {
		initData();
	}, [moduleList]);
	const onAddClick = (question) => {
		setShow(true);
		if (question.id) {
			setParam({ ...param, ...question });
			return;
		}
		setParam({});
	};
	const onOperateClick = () => {};
	const onQuestionOperate = (question) => {
		setAnswerList([...answerList, ...question.answerList]);
		setQuestionId(question.id);
		setHas(false);
		setDrawerShow(true);
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
	const updateMarkDown = (_, $, value, index) => {
		answerList[index] = value;
		setAnswerList([...answerList]);
	};
	const onMarddownSubmit = async () => {
		await api.post(url.answer, { questionId, answerList });
	};
	const onAnswerCheck = (record) => {
		if (!record.answerList || !record.answerList.length) {
			message.warning('请先添加答案');
			return false;
		}
		setCheckAnswerList([...checkAnswerList, ...record.answerList]);
		setHas(true);
		setDrawerShow(true);
		return true;
	};
	const onDrawerClose = () => {
		setDrawerShow(false);
		setCheckAnswerList([]);
		setAnswerList([]);
	};
	return (
		<>
			<Form layout="inline" form={form}>
				<Form.Item>
					<Button type="primary" htmlType="button" onClick={onAddClick}>添加</Button>
				</Form.Item>
				<Form.Item>
					<Select style={{ width: 200 }} placeholder="请选择模块">
						{
							moduleList.map((module) => {
								return <Option value={module.id} key={module.id}>{module.name}</Option>;
							})
						}
					</Select>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="button">搜索</Button>
				</Form.Item>
				<Form.Item>
					<Button type="default" htmlType="button">重置</Button>
				</Form.Item>
			</Form>
			<Divider />
			<Table bordered pagination={false} dataSource={dataList}>
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
								{ record.answerList && record.answerList.length ? '编辑答案' : '添加答案' }
							</Button>
							<Button
								onClick={() => onOperateClick(record)}
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
				title={isHas ? '查看答案' : '添加答案'}
				width={800}
				placement={isHas ? 'right' : 'left'}
				visible={isDrawerShow}
				onClose={onDrawerClose}
			>
				{
					isHas ? (
						<Space direction="vertical" style={{ width: '100%' }}>
							{
								checkAnswerList.map((answer, index) => {
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
					) : (
						<Space direction="vertical" style={{ width: '100%' }}>
							<Space>
								<Button
									type="dashed"
									icon={<PlusOutlined />}
									onClick={() => setAnswerList([...answerList, ''])}
								>
									添加答案
								</Button>
								<Button type="primary" onClick={onMarddownSubmit}>
									提交
								</Button>
							</Space>
							{
								answerList.map((answer, index) => {
									return (
										<Card
											title={`答案${index + 1}:`}
											style={{ width: '100%' }}
											key={`答案${index + 1}`}
											extra={(
												<CloseCircleOutlined onClick={
													() => {
														answerList.splice(index, 1);
														setAnswerList([...answerList]);
													}
												}
												/>
											)}
										>
											<MarkdownEditor
												style={{ width: '100%' }}
												height="300px"
												value={answer?.answer}
												onChange={(_, $, value) => updateMarkDown(_, $, value, index)}
											/>
										</Card>
									);
								})
							}
						</Space>
					)
				}
			</Drawer>
		</>
	);
};

export default QuestionList;
