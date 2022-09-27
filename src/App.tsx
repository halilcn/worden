import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import io from 'socket.io-client'

import { SOCKET_SERVER_URL } from './constants'
import routes from './routes'
import { socketServerActions } from './store/reducers/socket-server'
import './styles/index.scss'
import serverActions from './utils/server-actions'
import { RootState } from "./store";

const App = () => {
  const router = createBrowserRouter(routes)
  const dispatch = useDispatch()

  const socketServerState = useSelector((state: RootState) => state.socketServer)

  useEffect(() => {
    //const socket = io(SOCKET_SERVER_URL, { transports: ['websocket'] })
    // dispatch(socketServerActions.setServer(socket))

   // socketServerState.server?.emit('LOGIN','test')
  //  serverActions.login()

    return () => {
      //  dispatch(socketServerActions.deleteServer())
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
