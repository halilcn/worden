import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import ActiveUsersList from '../../components/active-users/active-users-list'
import IncomingRequestForGame from '../../components/active-users/incoming-request-for-game'
import RequestedForGame from '../../components/active-users/requested-for-game'
import { RootState } from '../../store'
import './index.scss'

const ActiveUsers = () => {
  const gameRoom = useSelector((state: RootState) => state.gameRoom)

  const memorizedDynamicContent = useMemo(() => {
    if (gameRoom.userSocketIdToRequestForGame) return <RequestedForGame />
    if (gameRoom.userSocketIdToIncomingForGame) return <IncomingRequestForGame />

    return <ActiveUsersList />
  }, [gameRoom.userSocketIdToRequestForGame, gameRoom.userSocketIdToIncomingForGame])

  return <div className="active-users">{memorizedDynamicContent}</div>
}

export default ActiveUsers
