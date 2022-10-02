import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import GameStarting from '../../components/game-dashboard/game/game-starting/game-starting'
import Room from '../../components/game-dashboard/room'
import { ROUTER_PATHS } from '../../constants'
import { RootState } from '../../store'
import './index.scss'

enum ACTIVE_COMPONENT_TYPES {
  GAME_STARTING,
  ROOM,
  GAME,
}

const GameDashboard = () => {
  const navigate = useNavigate()
  const gameRoom = useSelector((state: RootState) => state.gameRoom)
  const game = useSelector((state: RootState) => state.game)

  const [activeComponentsType, setActiveComponentsType] = useState<ACTIVE_COMPONENT_TYPES>(ACTIVE_COMPONENT_TYPES.ROOM)

  useEffect(() => {
    if (!gameRoom.roomId) navigate(ROUTER_PATHS.activeUsers)
  }, [])

  useEffect(() => {
    const readyPlayersLength = [...new Set(game.readyPlayersForCurrentGame)].length

    if (readyPlayersLength === 2) {
      setActiveComponentsType(ACTIVE_COMPONENT_TYPES.GAME_STARTING)
      setTimeout(() => {
        setActiveComponentsType(ACTIVE_COMPONENT_TYPES.GAME)
      }, 3000)
    }
  }, [game.readyPlayersForCurrentGame.length])

  const memorizedDynamicContent = useMemo(() => {
    if (activeComponentsType === ACTIVE_COMPONENT_TYPES.ROOM) return <Room />
    if (activeComponentsType === ACTIVE_COMPONENT_TYPES.GAME_STARTING) return <GameStarting />
    if (activeComponentsType === ACTIVE_COMPONENT_TYPES.GAME) return <div>game place !!</div>

    return <Room />
  }, [activeComponentsType])

  return <div className="game-dashboard">{memorizedDynamicContent}</div>
}

export default GameDashboard
