import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import routes from './routes'
import { RootState } from './store'
import { gameRoomActions } from './store/reducers/game-room'
import './styles/index.scss'
import serverActions from './utils/server-events'
import serverListeners from './utils/server-listeners'

const App = () => {
  const router = createBrowserRouter(routes)
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    serverListeners.activeUsers(activeUsers => {
      dispatch(gameRoomActions.setActiveUsers(activeUsers))
    })

    return () => {
      //TODO: ! username problem

      //  if (auth.username) serverActions.logout('test') /*auth.username*/
      serverActions.logout('test')
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
