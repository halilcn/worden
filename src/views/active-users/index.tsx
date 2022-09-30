import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ActiveUsersList from '../../components/active-users/active-users-list'
import IncomingRequestForGame from '../../components/active-users/incoming-request-for-game'
import RequestedForGame from '../../components/active-users/requested-for-game'
import { RootState } from '../../store'
import { gameRoomActions } from '../../store/reducers/game-room'
import serverEvents from '../../utils/server-events'
import serverListeners from '../../utils/server-listeners'
import './index.scss'

const ActiveUsers = () => {
  const dispatch = useDispatch()
  const gameRoom = useSelector((state: RootState) => state.gameRoom)

  useEffect(() => {
    serverListeners.gameCanceled(() => {
      dispatch(gameRoomActions.leaveFromRoom())
    })

    serverListeners.gameAccepted(roomId => {
      serverEvents.loginGameRoom(roomId)
    })
  }, [])

  const memorizedDynamicContent = useMemo(() => {
    if (gameRoom.userSocketIdToRequestForGame) return <RequestedForGame />
    if (gameRoom.userSocketIdToIncomingForGame) return <IncomingRequestForGame />

    return <ActiveUsersList />
  }, [gameRoom.userSocketIdToRequestForGame, gameRoom.userSocketIdToIncomingForGame])

  return <div className="active-users">{memorizedDynamicContent}</div>
}

export default ActiveUsers
