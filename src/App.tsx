import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import io from 'socket.io-client'

import { SOCKET_SERVER_URL } from './constants'
import routes from './routes'
import { socketServerActions } from './store/reducers/socket-server'
import './styles/index.scss'

const App = () => {
  const router = createBrowserRouter(routes)
  const dispatch = useDispatch()

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, { transports: ['websocket'] })
    dispatch(socketServerActions.setServer(socket))

    return () => {
      dispatch(socketServerActions.deleteServer())
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
