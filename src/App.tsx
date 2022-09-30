import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { USERNAME_LOCALSTORAGE } from './constants'
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

  //TODO: localstorage ?

  const usernameRef = useRef<string>('')

  useEffect(() => {
    alert('use effect selam')
    usernameRef.current = auth.username
  }, [auth.username])

  useEffect(() => {
    serverListeners.activeUsers(activeUsers => {
      dispatch(gameRoomActions.setActiveUsers(activeUsers))
    })

    return () => {
      alert(usernameRef.current)
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
