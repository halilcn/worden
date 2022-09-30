import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Room from '../../components/game-dashboard/room'
import { ROUTER_PATHS } from '../../constants'
import { RootState } from '../../store'
import './index.scss'

const GameDashboard = () => {
  const navigate = useNavigate()
  const gameRoom = useSelector((state: RootState) => state.gameRoom)

  useEffect(() => {
    if (!gameRoom.roomId) navigate(ROUTER_PATHS.activeUsers)
  }, [])

  return (
    <div className="game-dashboard">
      <Room />
    </div>
  )
}

export default GameDashboard
