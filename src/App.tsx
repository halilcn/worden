import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import routes from './routes'
import { gameRoomActions } from './store/reducers/game-room'
import './styles/index.scss'
import serverListeners from './utils/server-listeners'

//TODO: puanlamada 2 kere socket.on dinleniyor gibi ?

const App = () => {
  const router = createBrowserRouter(routes)
  const dispatch = useDispatch()

  useEffect(() => {
    serverListeners.activeUsers(activeUsers => {
      dispatch(gameRoomActions.setActiveUsers(activeUsers))
    })
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
