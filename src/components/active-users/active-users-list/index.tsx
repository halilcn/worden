import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../../store'
import { gameRoomActions } from '../../../store/reducers/game-room'
import { ActiveUserStatus } from '../../../types'
import serverEvents from '../../../utils/server-events'
import serverListeners from '../../../utils/server-listeners'
import './index.scss'

const ActiveUsersList = () => {
  const dispatch = useDispatch()
  const gameRoom = useSelector((state: RootState) => state.gameRoom)
  const auth = useSelector((state: RootState) => state.auth)

  const [filterText, setFilterText] = useState<string>('')

  useEffect(() => {
    serverListeners.incomingGameRequest((fromUserSocketId: string) => {
      dispatch(gameRoomActions.setSocketUserIdToIncomingForGame(fromUserSocketId))
    })
  }, [])

  const isStatusIdle = (status: ActiveUserStatus) => {
    return status === ActiveUserStatus.IDLE
  }

  const isStatusBusy = (status: ActiveUserStatus) => {
    return status === ActiveUserStatus.BUSY
  }

  const handleStartGame = (socketId: string) => {
    serverEvents.sendGameRequest(socketId)
    dispatch(gameRoomActions.setSocketUserIdToRequestForGame(socketId))
  }

  return (
    <div className="users-list">
      <input
        onChange={e => setFilterText(e.target.value)}
        value={filterText}
        placeholder="Search an online user by username..."
        className="users-list__search"
      />
      {gameRoom.activeUsers.length <= 1 && <div className="users-list__no-active-users">No active users :(</div>}
      {gameRoom.activeUsers.length > 1 && (
        <div className="users-list__list">
          {gameRoom.activeUsers
            .filter(user => user.username.includes(filterText) && user.username !== auth.username)
            .map(user => (
              <div
                onClick={() => isStatusIdle(user.status) && handleStartGame(user.socketId)}
                className={cn('users-list__item', { 'users-list__item--idle': isStatusIdle(user.status) })}>
                <div className="users-list__username">{user.username}</div>
                <div
                  className={cn('users-list__status', {
                    'users-list__status--busy': isStatusBusy(user.status),
                    'users-list__status--idle': isStatusIdle(user.status),
                  })}>
                  {user.status}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default ActiveUsersList
