import { useHistory } from 'react-router-dom';
import {
	Form,
	Input,
	Button,
	message
} from 'antd';
import { useSetRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/atom';
import api from '../../assets/api/api';
import url from '../../assets/api/url';
import './index.scss';

const Login = () => {
	const history = useHistory();
	const setUserInfoState = useSetRecoilState(userInfoState);
	const onFinish = async (value) => {
		const { data, code, msg } = await api.post(url.login, {
			username: value.username,
			password: value.password
		});
		message.success(msg);
		if (code) return;
		window.localStorage.setItem('token', data.token);
		setUserInfoState(data);
		history.push('/main/module');
	};
	return (
		<div className="login">
			<div className="content">
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item
						label="用户名"
						name="username"
						rules={[{ required: true, message: '请输入用户名!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="密码"
						name="password"
						rules={[{ required: true, message: '请输入密码!' }]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default Login;
