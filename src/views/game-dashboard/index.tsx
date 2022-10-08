import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import GamePlace from '../../components/game-dashboard/game/game-place'
import GameStarting from '../../components/game-dashboard/game/game-starting/game-starting'
import Room from '../../components/game-dashboard/room'
import { EXPECTED_PLAYERS_COUNT_IN_ROOM, ROUTER_PATHS } from '../../constants'
import { RootState } from '../../store'
import { gameActions } from '../../store/reducers/game'
import { GAME_ACTIVE_PAGE } from '../../types'
import serverEvents from '../../utils/server-events'
import serverListeners from '../../utils/server-listeners'
import './index.scss'

const GameDashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const gameRoom = useSelector((state: RootState) => state.gameRoom)
  const game = useSelector((state: RootState) => state.game)

  useEffect(() => {
    if (!gameRoom.roomId) navigate(ROUTER_PATHS.activeUsers)

    serverListeners.gameStarted(words => {
      const onlyWords = Object.keys(words)
      const onlyWordAnswers = Object.values(words)

      dispatch(gameActions.setWords(onlyWords))
      dispatch(gameActions.setWordAnswers(onlyWordAnswers))
    })
  }, [])

  useEffect(() => {
    const readyPlayersLength = [...new Set(game.readyPlayersForCurrentGame)].length

    if (readyPlayersLength === EXPECTED_PLAYERS_COUNT_IN_ROOM) gameStartingProcess()
  }, [game.readyPlayersForCurrentGame.length])

  const memorizedDynamicContent = useMemo(() => {
    if (game.activePage === GAME_ACTIVE_PAGE.ROOM) return <Room />
    if (game.activePage === GAME_ACTIVE_PAGE.GAME_STARTING) return <GameStarting />
    if (game.activePage === GAME_ACTIVE_PAGE.GAME) return <GamePlace />

    return <Room />
  }, [game.activePage])

  const gameStartingProcess = () => {
    dispatch(gameActions.setActivePage(GAME_ACTIVE_PAGE.GAME_STARTING))
    setTimeout(() => {
      dispatch(gameActions.setActivePage(GAME_ACTIVE_PAGE.GAME))
    }, 4500)

    if (gameRoom.userSocketIdToRequestForGame) serverEvents.gameStarting(gameRoom.roomId as string)
  }

  return <div className="game-dashboard">{memorizedDynamicContent}</div>
}

export default GameDashboard
