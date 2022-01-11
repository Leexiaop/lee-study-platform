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
	Row,
	Col,
	Drawer
} from 'antd';
import MarkdownEditor from '@uiw/react-markdown-editor';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../assets/api/api';
import url from '../../assets/api/url';
import './index.scss';

const { Option } = Select;
const { Column } = Table;

const dataSource = [
	{
		key: 1,
		question: 'React的虚拟dom是什么？',
		answerList: [
			{
				id: 1,
				answer: '大家即将放假啊姐姐'
			},
			{
				id: 2,
				answer: '大家即将放假啊姐姐'
			}
		]
	}
];

const markdown = "## Install\n\n```bash\nnpm i @uiw/react-markdown-editor\n```\n\n## Document\n\nOfficial document [demo preview](https://uiwjs.github.io/react-markdown-editor/) ([🇨🇳中国镜像网站](http://uiw.gitee.io/react-markdown-editor/))\n\n## Basic Usage\n\n```jsx\nimport MarkdownEditor from '@uiw/react-markdown-editor';\nimport React from 'react';\nimport ReactDOM from 'react-dom';\n\nconst Dome = () => (\n  <MarkdownEditor\n    value={this.state.markdown}\n    onChange={this.updateMarkdown}\n  />\n);\n\nReactDOM.render(<Dome />, document.getElementById('app'));\n```";

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 4 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 20 }
	}
};
const formItemLayoutWithOutLabel = {
	wrapperCol: {
		xs: { span: 24, offset: 0 },
		sm: { span: 20, offset: 4 }
	}
};

const QuestionList = () => {
	const [form] = Form.useForm();
	const [query, setQuery] = useState({});
	const [moduleList, setModuleList] = useState([]);
	const [param, setParam] = useState({});
	const [isShow, setShow] = useState(false);
	const [isDrawerShow, setDrawerShow] = useState(true);
	useEffect(async () => {
		const { data } = await api.get(url.studyModule);
		setModuleList(data);
	}, []);
	const onAddClick = () => {
		setShow(true);
	};
	const onOperateClick = () => {};
	const handleCancel = () => {
		setShow(false);
		setParam({});
	};
	const updateMarkdown = (editor, data, value) => {
		console.log(editor, data, value);
	};
	return (
		<>
			<Form layout="inline" form={form}>
				<Form.Item>
					<Button type="primary" htmlType="button">添加</Button>
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
			<Table bordered dataSource={dataSource}>
				<Column title="序号" dataIndex="key" key="key" align="center" />
				<Column title="问题" dataIndex="question" key="question" align="center" />
				<Column
					title="答案"
					align="center"
					ellipsis
					render={(_, record) => (
						record.answerList.map((r, index) => {
							return (
								<span key={r.id}>
									{r.answer}
									{index <= record.answerList.length - 1 ? '；' : ''}
								</span>
							);
						})
					)}
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
								编辑
							</Button>
							<Button
								onClick={() => onOperateClick(record)}
								type="default"
								size="small"
							>
								查看答案
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
			>
				<Form form={form} layout="horizontal" labelCol={{ span: 4 }} style={{ maxHeight: 600, overflowY: 'auto' }}>
					<Form.Item label="学习模块：">
						<Select style={{ width: '100%' }} placeholder="请选择模块">
							{
								moduleList.map((module) => {
									return <Option value={module.id} key={module.id}>{module.name}</Option>;
								})
							}
						</Select>
					</Form.Item>
					<Form.Item label="问题：">
						<Input placeholder="请写下您的问题" />
					</Form.Item>
					<Form.List name="answerList">
						{(fields, { add, remove }, { errors }) => (
							<>
								{fields.map((field, index) => (
									<Form.Item
										{...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
										label={index === 0 ? '答案' : ''}
										required={false}
										key={field.key}
									>
										<Row wrap={false}>
											<Col flex="auto">
												<MarkdownEditor
													height="300px"
													value="this is markdown editor"
													onChange={updateMarkdown}
												/>
											</Col>
											<Col flex="none">
												<MinusCircleOutlined
													width="90%"
													className="dynamic-delete-button"
													onClick={() => remove(field.name)}
												/>
											</Col>
										</Row>
									</Form.Item>
								))}
								<Form.Item>
									<Button
										type="dashed"
										onClick={() => add()}
										style={{ width: '100%' }}
										icon={<PlusOutlined />}
									>
										添加答案
									</Button>
									<Form.ErrorList errors={errors} />
								</Form.Item>
							</>
						)}
					</Form.List>
				</Form>
			</Modal>
			<Drawer
				title="查看答案"
				width={800}
				visible={isDrawerShow}
			>
				<ReactMarkdown
					children={markdown}
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
			</Drawer>
		</>
	);
};

export default QuestionList;
