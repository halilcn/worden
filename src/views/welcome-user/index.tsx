import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ROUTER_PATHS, SOCKET_CHANNELS } from '../../constants'
import { RootState } from '../../store'
import { authActions } from '../../store/reducers/auth'
import serverEvents from '../../utils/server-events'
import serverListeners from '../../utils/server-listeners'
import './index.scss'

const WelcomeUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authState = useSelector((state: RootState) => state.auth)
  const socketServerState = useSelector((state: RootState) => state.socketServer)

  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    if (authState.username) navigate(ROUTER_PATHS.activeUsers)
  }, [])

  useEffect(() => {
    serverListeners.alreadyExistUsername(() => {
      alert('zaten bu var !')
    })
  }, [])

  const handleSaveUsername = () => {
    if (username === '') return
    dispatch(authActions.setUsername(username))
    serverEvents.login(username)
    //socketServerState.server?.emit(SOCKET_CHANNELS.LOGIN, username)
    // navigate(ROUTER_PATHS.activeUsers)
  }

  return (
    <div className="welcome">
      <div className="welcome__text">Welcome !</div>
      <input
        onKeyPress={e => e.key === 'Enter' && handleSaveUsername()}
        onChange={e => setUsername(e.target.value)}
        placeholder="Type a username to play..."
        className="welcome__username-input"
      />
      <div onClick={handleSaveUsername} className="welcome__save-username">
        Login
      </div>
    </div>
  )
}

export default WelcomeUser
