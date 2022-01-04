import { atom } from 'recoil';

const userInfoState = atom({
	key: 'userInfo',
	default: {
		username: ''
	}
});
export default userInfoState;
