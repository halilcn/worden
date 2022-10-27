import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ROUTER_PATHS } from '../../../constants'
import { gameActions } from '../../../store/reducers/game'
import { gameRoomActions } from '../../../store/reducers/game-room'
import serverListeners from '../../../utils/server-listeners'
import FinishGameButton from './finish-game-button'
import './index.scss'
import ReadyButton from './ready-button'
import Score from './score'
import TotalRound from './total-round'

const Room = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(gameActions.prepareForNewGame())

    serverListeners.readiedUser(userSocketId => {
      dispatch(gameActions.addReadyPlayer(userSocketId))
    })

    serverListeners.logoutGameRoom(() => {
      dispatch(gameRoomActions.leaveFromRoom())
      dispatch(gameActions.logoutFromGame())
      navigate(ROUTER_PATHS.activeUsers)
    })
  }, [])

  return (
    <div className="room">
      <Score />
      <TotalRound />
      <ReadyButton />
      <FinishGameButton />
    </div>
  )
}

export default Room
