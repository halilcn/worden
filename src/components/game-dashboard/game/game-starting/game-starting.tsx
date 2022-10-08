import StartingGame from '../../../shared/starting-game'
import './index.scss'

const GameStarting = () => {
  return (
    <div className="game-starting">
      <StartingGame />
      <div className="game-starting__text">Game is starting !</div>
    </div>
  )
}

export default GameStarting
