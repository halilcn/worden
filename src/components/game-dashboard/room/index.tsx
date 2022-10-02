import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { gameActions } from '../../../store/reducers/game'
import serverListeners from '../../../utils/server-listeners'
import './index.scss'
import ReadyButton from './ready-button'
import Score from './score'
import TotalRound from './total-round'

const Room = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    serverListeners.readiedUser(userSocketId => {
      dispatch(gameActions.addReadyPlayer(userSocketId))
    })
  }, [])

  return (
    <div className="room">
      <Score />
      <TotalRound />
      <ReadyButton />
    </div>
  )
}

export default Room
