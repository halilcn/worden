import CurrentWord from './current-word'
import './index.scss'
import RemainingTime from './remaining-time'
import SendAnswer from './send-answer'

const GamePlace = () => {
  return (
    <div className="game-place">
      <RemainingTime />
      <CurrentWord />
      <SendAnswer />
    </div>
  )
}

export default GamePlace
