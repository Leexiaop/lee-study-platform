import { selector } from 'recoil';
import { userInfoState } from '../atom';

const userState = selector({
	key: 'userState',
	get: async ({ get }) => {
		const obj = get(userInfoState);
		return obj;
	}
});
export default userState;
