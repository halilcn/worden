import { useSelector } from 'react-redux'

import { RootState } from '../../../../store'
import './index.scss'

const Score = () => {
  const game = useSelector((state: RootState) => state.game)

  const playerOne = game.players[0]
  const playerTwo = game.players[1]

  const isReady = (socketId: string) => {
    return game.readyPlayersForCurrentGame.includes(socketId)
  }

  return (
    <div className="score">
      <div className="score__top">
        <div className="score__user">
          {isReady(playerOne.userSocketId) && <div className="score__ready-status">ready</div>}
          <div className="score__username">{playerOne.username}</div>
          <div className="score__point">{playerOne.point}</div>
        </div>
        <img className="score__vs-icon" src="./icons/vs.png" />
        <div className="score__user">
          {isReady(playerTwo.userSocketId) && <div className="score__ready-status">ready</div>}
          <div className="score__username">{playerTwo.username}</div>
          <div className="score__point">{playerTwo.point}</div>
        </div>
      </div>
    </div>
  )
}

export default Score
