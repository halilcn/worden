import './index.scss';

const WelcomeUser = () => {
  return (
    <div className="welcome">
      <div className="welcome__text">Welcome !</div>
      <input className="welcome__username-input" />
      <div className="welcome__save-username">save</div>
    </div>
  );
};

export default WelcomeUser;
