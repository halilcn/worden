import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../../store'
import { ActiveUserStatus, IActiveUser } from '../../../types'
import './index.scss'

const ActiveUsersList = () => {
  const gameRoom = useSelector((state: RootState) => state.gameRoom)

  const [filterText, setFilterText] = useState<string>('')

  const isStatusIdle = (status: ActiveUserStatus) => {
    return status === ActiveUserStatus.IDLE
  }

  const isStatusBusy = (status: ActiveUserStatus) => {
    return status === ActiveUserStatus.BUSY
  }

  const handleStartGame = () => {
    //socket istek. socket id ile
    alert('test')
  }

  return (
    <div className="users-list">
      <input
        onChange={e => setFilterText(e.target.value)}
        value={filterText}
        placeholder="Search an online user by username..."
        className="users-list__search"
      />
      <div className="users-list__list">
        {gameRoom.activeUsers
          .filter(user => user.username.includes(filterText))
          .map(user => (
            <div
              onClick={() => isStatusIdle(user.status) && handleStartGame()}
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
    </div>
  )
}

export default ActiveUsersList
