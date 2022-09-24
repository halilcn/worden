import Score from './score';

import './index.scss';
import TotalRound from './total-round';
import ReadyButton from './ready-button';

const Room = () => {
  return (
    <div className="room">
      <Score />
      <TotalRound/>
      <ReadyButton/>
    </div>
  );
};

export default Room;
