import cn from 'classnames'
import { useEffect, useState } from 'react'

import { ActiveUserStatus, IActiveUser } from '../../types'
import './index.scss'

const ActiveUserList = () => {
  const [filterText, setFilterText] = useState<string>('')
  const [activeUsers, setActiveUsers] = useState<IActiveUser[]>([])

  useEffect(() => {
    setActiveUsers([
      { username: 'halil', status: ActiveUserStatus.BUSY },
      { username: 'ahmet', status: ActiveUserStatus.IDLE },
    ])
  }, [])

  const isStatusIdle = (status: ActiveUserStatus) => {
    return status === ActiveUserStatus.IDLE
  }

  const isStatusBusy = (status: ActiveUserStatus) => {
    return status === ActiveUserStatus.BUSY
  }

  const handleStartGame = () => {
    alert('test')
  }

  return (
    <div className="active-users">
      <input
        onChange={e => setFilterText(e.target.value)}
        value={filterText}
        placeholder="Search an online user by username..."
        className="active-users__search"
      />
      <div className="active-users__list">
        {activeUsers.map(user => (
          <div
            onClick={() => isStatusIdle(user.status) && handleStartGame()}
            className={cn('active-users__item', { 'active-users__item--idle': isStatusIdle(user.status) })}>
            <div className="active-users__username">{user.username}</div>
            <div
              className={cn('active-users__status', {
                'active-users__status--busy': isStatusBusy(user.status),
                'active-users__status--idle': isStatusIdle(user.status),
              })}>
              {user.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActiveUserList
