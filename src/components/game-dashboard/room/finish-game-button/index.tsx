import { useSelector } from 'react-redux'

import { RootState } from '../../../../store'
import serverEvents from '../../../../utils/server-events'
import './index.scss'

const FinishGameButton = () => {
  const gameRoom = useSelector((state: RootState) => state.gameRoom)

  const handleFinishGame = () => {
    serverEvents.sendRequestLogoutGameRoom(gameRoom.roomId as string)
  }

  return (
    <div className="finish-game-button">
      <div onClick={handleFinishGame} className="finish-game-button__element">
        Finish Game
      </div>
    </div>
  )
}

export default FinishGameButton
