import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
      dispatch(gameActions.addFinishedUserSocketId(auth.socketId))
      dispatch(gameActions.addPointOfUser(payload))

      //todo: burada pointleri koy
      console.log('user point !!!')
      console.log(payload)
    })
  }, [])

  useEffect(() => {
    if (game.finishedPlayersSocketId.length === 2) dispatch(gameActions.setActivePage(GAME_ACTIVE_PAGE.ROOM))
  }, [game.finishedPlayersSocketId.length])

  return (
    <div className="game-place">
      <RemainingTime />
      <CurrentWord />
      <SendAnswer />
      <WaitingUserToFinish />
    </div>
  )
}

export default GamePlace
