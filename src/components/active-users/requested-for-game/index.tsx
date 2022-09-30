import { useSelector } from 'react-redux'

import { RootState } from '../../../store'
import serverEvents from '../../../utils/server-events'
import Loading from '../../shared/loading'
import './index.scss'

const RequestedForGame = () => {
  const gameRoom = useSelector((state: RootState) => state.gameRoom)

  const handleCancelGame = () => {
    serverEvents.cancelGameRequest(gameRoom.userSocketIdToRequestForGame as string)
  }

  return (
    <div className="requested-game">
      <div className="requested-game__text">Waiting for user...</div>
      <Loading />
      <div onClick={handleCancelGame} className="requested-game__cancel">
        Cancel
      </div>
    </div>
  )
}

export default RequestedForGame
