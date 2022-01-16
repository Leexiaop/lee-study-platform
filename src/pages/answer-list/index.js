import { useState, useEffect } from 'react';
import {
	Form,
	Button,
	Select,
	Divider,
	Table,
	Space,
	Drawer,
	Modal
} from 'antd';
import MarkdownEditor from '@uiw/react-markdown-editor';
import api from '../../assets/api/api';
import url from '../../assets/api/url';
import './index.scss';

const { Option } = Select;
const { Column } = Table;

const AnswerList = () => {
	const [form] = Form.useForm();
	const [query, setQuery] = useState({});
	const [moduleList, setModuleList] = useState([]);
	const [questionList, setQuestionList] = useState([]);
	const [dataList, setDataList] = useState([]);
	const [isDrawerShow, setDrawerShow] = useState(false);
	const [answer, setAnswer] = useState({});
	const [answerId, setAnswerId] = useState('');

	const initData = async () => {
		const { data } = await api.get(url.answer);
		setDataList(data.map((item, index) => {
			return {
				key: index + 1,
				id: item.id,
				moduleId: item.moduleId,
				moduleName: moduleList.find((m) => m.id === item.moduleId)?.name,
				answer: item.answer,
				questionId: item.questionId,
				questionName: questionList.find((q) => q.id === item.questionId)?.question,
				online: item.online
			};
		}));
	};
	useEffect(() => {
		form.resetFields();
	}, [isDrawerShow]);
	useEffect(async () => {
		const module = await api.get(url.studyModule);
		setModuleList(module.data);
		const question = await api.get(url.question);
		setQuestionList(question.data);
	}, []);
	useEffect(() => {
		if (questionList.length) {
			initData();
		}
	}, [questionList]);
	const onMarkdownSubmit = async (value) => {
		await api[answerId ? 'put' : 'post'](url.answer, answerId ? { answer: answer.answer, id: answerId } : { ...value, answer: answer.answer });
		setDrawerShow(false);
		setAnswer({});
		initData();
	};
	const onDrawerClose = () => {
		setDrawerShow(false);
		setAnswer({});
	};
	const onAddClick = (record) => {
		setDrawerShow(true);
		if (record.id) {
			setAnswer({ ...answer, ...record });
			setAnswerId(record.id);
			return;
		}
		setAnswerId('');
		setAnswer({});
	};
	const onAnswerOperate = async (record) => {
		await api.put(url.answerOnline, { id: record.id, online: record.online ? 0 : 1 });
		initData();
	};
	const onQuestionDelete = (value) => {
		Modal.confirm({
			content: '您确定要删除吗？',
			okText: '是的',
			cancelText: '等会儿，我再想想！',
			onOk: async () => {
				await api.delete(`${url.answer}/${value.id}`);
				initData();
			}
		});
	};
	const onMarkdownChange = (_, $, value) => {
		setAnswer({ ...answer, answer: value });
	};
	return (
		<>
			<Space>
				<Button type="primary" htmlType="button" onClick={onAddClick}>添加</Button>
				<Select style={{ width: 200 }} placeholder="请选择模块">
					{
						moduleList.map((module) => {
							return <Option value={module.id} key={module.id}>{module.name}</Option>;
						})
					}
				</Select>
				<Select style={{ width: 200 }} placeholder="请选择答案">
					{
						questionList.map((question) => {
							return <Option value={question.id} key={question.id}>{question.question}</Option>;
						})
					}
				</Select>
				<Button type="primary" htmlType="submit">搜索</Button>
				<Button type="default" htmlType="button">重置</Button>
			</Space>
			<Divider />
			<Table bordered dataSource={dataList}>
				<Column title="序号" dataIndex="key" align="center" />
				<Column title="模块" dataIndex="moduleName" align="center" />
				<Column title="问题" dataIndex="questionName" align="center" />
				<Column title="答案" dataIndex="answer" ellipsis align="center" />
				<Column
					title="操作"
					render={(record) => (
						<Space>
							<Button
								type="primary"
								size="small"
								onClick={() => onAddClick(record)}
							>
								编辑
							</Button>
							<Button
								type="primary"
								size="small"
								ghost
								onClick={() => onAnswerOperate(record)}
							>
								{record.online ? '下线' : '上线'}
							</Button>
							<Button
								type="default"
								danger
								size="small"
								onClick={() => onQuestionDelete(record)}
							>
								删除
							</Button>
						</Space>
					)}
				/>
			</Table>
			<Drawer
				title={answerId ? '编辑' : '添加答案'}
				width={800}
				getContainer={false}
				visible={isDrawerShow}
				onClose={onDrawerClose}
			>
				<Space direction="vertical" style={{ width: '100%', height: '100%' }}>
					<Form layout="inline" form={form} initialValues={answer} onFinish={onMarkdownSubmit}>
						<Form.Item
							label="学习模块"
							name="moduleId"
							rules={[
								{
									required: true,
									message: '请选择学习模块！'
								}
							]}
						>
							<Select style={{ width: 200 }} disabled={!!answerId} placeholder="请选择模块">
								{
									moduleList.map((module) => {
										return <Option value={module.id} key={module.id}>{module.name}</Option>;
									})
								}
							</Select>
						</Form.Item>
						<Form.Item
							name="questionId"
							label="请选择答案"
							rules={[
								{
									required: true,
									message: '请选择问题！'
								}
							]}
						>
							<Select style={{ width: 200 }} disabled={!!answerId} placeholder="请选择答案">
								{
									questionList.map((question) => {
										return <Option value={question.id} key={question.id}>{question.question}</Option>;
									})
								}
							</Select>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
							>
								提交
							</Button>
						</Form.Item>
					</Form>
					<MarkdownEditor
						style={{ width: '100%' }}
						height="500"
						value={answer.answer}
						onChange={(_, $, value) => onMarkdownChange(_, $, value)}
					/>
				</Space>
			</Drawer>
		</>
	);
};

export default AnswerList;
