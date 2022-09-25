import './index.scss'
import ReadyButton from './ready-button'
import Score from './score'
import TotalRound from './total-round'

const Room = () => {
  return (
    <div className="room">
      <Score />
      <TotalRound />
      <ReadyButton />
    </div>
  )
}

export default Room
