import { useDispatch } from 'react-redux';
import { authActions } from '../../store/reducers/auth';

import './index.scss';

const WelcomeUser = () => {
  const dispatch = useDispatch();

  const handleSaveUsername = () => {
    dispatch(authActions.setUsername('test'));
  };

  return (
    <div className="welcome">
      <div className="welcome__text">Welcome !</div>
      <input placeholder="Type an username to play..." className="welcome__username-input" />
      <div onClick={handleSaveUsername} className="welcome__save-username">
        continue
      </div>
    </div>
  );
};

export default WelcomeUser;
