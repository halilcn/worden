import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { USERNAME_LOCALSTORAGE } from './constants'
import routes from './routes'
import { gameRoomActions } from './store/reducers/game-room'
import './styles/index.scss'
import serverActions from './utils/server-events'
import serverListeners from './utils/server-listeners'

//TODO: game started olduğunda total round 2 oluyor ?
//TODO: total round 2'şer artıyor ?
//TODO: oyunu erken bitirene ek puan olayı ?
//TODO: oyunda exit etme ? buton yok. 
//TODO: broweser destroy edildiğinde user logout olmuyor.
//TODO: login olmadan, girmemesi gerek page'lere girebiliyor.
//TODO: puanlamada 2 kere socket.on dinleniyor gibi ?
//TODO: game point calculate nasıl çalışıyor ? code review 
//TODO: word list'e yeni kelime ekle

const App = () => {
  const router = createBrowserRouter(routes)
  const dispatch = useDispatch()

  useEffect(() => {
    serverListeners.activeUsers(activeUsers => {
      dispatch(gameRoomActions.setActiveUsers(activeUsers))
    })

    return () => {
      const username = localStorage.getItem(USERNAME_LOCALSTORAGE)

      if (username) {
        serverActions.logout(username)
        localStorage.removeItem(USERNAME_LOCALSTORAGE)
      }
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
