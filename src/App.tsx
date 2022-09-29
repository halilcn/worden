import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { USERNAME_LOCALSTORAGE } from './constants'
import routes from './routes'
import { gameRoomActions } from './store/reducers/game-room'
import './styles/index.scss'
import serverActions from './utils/server-events'
import serverListeners from './utils/server-listeners'

const App = () => {
  const router = createBrowserRouter(routes)
  const dispatch = useDispatch()

  useEffect(() => {
    serverListeners.activeUsers(activeUsers => {
      dispatch(gameRoomActions.setActiveUsers(activeUsers))
    })

    serverListeners.incomingGameRequest((fromUserSocketId: string) => {
      dispatch(gameRoomActions.setSocketUserIdToIncomingForGame(fromUserSocketId))
    })

    return () => {
      const username = localStorage.getItem(USERNAME_LOCALSTORAGE)

      if (username) serverActions.logout(username)
      localStorage.removeItem(USERNAME_LOCALSTORAGE)
    }
  }, [])

  return (
    <div className="main">
      <div className="main__wrapper">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
