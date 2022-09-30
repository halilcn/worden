import { useSelector } from 'react-redux'

import { RootState } from '../../../store'
import serverEvents from '../../../utils/server-events'
import WaitBird from '../../shared/wait-bird'
import './index.scss'

const IncomingRequestForGame = () => {
  const gameRoom = useSelector((state: RootState) => state.gameRoom)
  const auth = useSelector((state: RootState) => state.auth)

  const handleCancelGame = () => {
    serverEvents.cancelGameRequest(gameRoom.userSocketIdToIncomingForGame as string)
  }

  const handleAcceptGame = () => {
    const roomId = `${auth.socketId}___${gameRoom.userSocketIdToIncomingForGame}`
    serverEvents.acceptGameRequest({ roomId, gameUserSocketId: gameRoom.userSocketIdToIncomingForGame as string })
  }

  return (
    <div className="incoming-request-game">
      <div className="incoming-request-game__text">A user sent you a game request !</div>
      <WaitBird />
      <div className="incoming-request-game__actions">
        <div onClick={handleCancelGame} className="incoming-request-game__action-button incoming-request-game__action-button--reject">
          reject
        </div>
        <div onClick={handleAcceptGame} className="incoming-request-game__action-button incoming-request-game__action-button--accept">
          accept
        </div>
      </div>
    </div>
  )
}

export default IncomingRequestForGame
