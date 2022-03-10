import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '@store/user';

export const HomePage = () => {
  const navigate = useNavigate();
  const { username, email, gender } = useRecoilValue(userInfoAtom);

  const login = () => {
    navigate('/login');
  };

  return (
    <div>
      <div className="ml-24px text-100px">首页</div>
      {username}, {email}, {gender}
    </div>
  );
};
