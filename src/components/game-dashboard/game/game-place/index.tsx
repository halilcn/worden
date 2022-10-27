import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { EXPECTED_PLAYERS_COUNT_IN_ROOM } from '../../../../constants'
import { RootState } from '../../../../store'
import { gameActions } from '../../../../store/reducers/game'
import { GAME_ACTIVE_PAGE } from '../../../../types'
import serverListeners from '../../../../utils/server-listeners'
import CurrentWord from './current-word'
import './index.scss'
import RemainingTime from './remaining-time'
import SendAnswer from './send-answer'
import WaitingUserToFinish from './waiting-user-to-finish'

const GamePlace = () => {
  const dispatch = useDispatch()

  const auth = useSelector((state: RootState) => state.auth)
  const game = useSelector((state: RootState) => state.game)

  useEffect(() => {
    serverListeners.pointOfUser(payload => {
      dispatch(gameActions.addFinishedUserSocketId(payload.userSocketId))
      dispatch(gameActions.addPointOfUser(payload))
    })
  }, [])

  useEffect(() => {
    if (game.finishedPlayersSocketId.length === EXPECTED_PLAYERS_COUNT_IN_ROOM) {
      dispatch(gameActions.increaseTotalRound())

      setTimeout(() => {
        dispatch(gameActions.setActivePage(GAME_ACTIVE_PAGE.ROOM))
      }, 1000)
    }
  }, [game.finishedPlayersSocketId.length])

  return (
    <div className="game-place">
      {game.finishedPlayersSocketId.includes(auth.socketId) ? (
        <div className="game-place__section">
          <WaitingUserToFinish />
        </div>
      ) : (
        <div className="game-place__section">
          <RemainingTime />
          <CurrentWord />
          <SendAnswer />
        </div>
      )}
    </div>
  )
}

export default GamePlace
