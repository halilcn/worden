import './index.scss';

const Score = () => {
  return (
    <div className="score">
      <div className="score__top">
        <div className="score__user">
          <div className="score__username">halil can</div>
          <div className="score__point">120</div>
        </div>
        <img className="score__vs-icon" src="./icons/vs.png" />
        <div className="score__user">
          <div className="score__username">test selam</div>
          <div className="score__point">120</div>
        </div>
      </div>
    </div>
  );
};

export default Score;
