import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ROUTER_PATHS, USERNAME_LOCALSTORAGE } from '../../constants'
import { RootState } from '../../store'
import { authActions } from '../../store/reducers/auth'
import serverEvents from '../../utils/server-events'
import serverListeners from '../../utils/server-listeners'
import './index.scss'

const WelcomeUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authState = useSelector((state: RootState) => state.auth)

  const [alreadyExist, setAlreadyExist] = useState<boolean>(false)

  const usernameRef = useRef<string>('')

  useEffect(() => {
    if (authState.username) navigate(ROUTER_PATHS.activeUsers)

    serverListeners.alreadyExistUsername(() => {
      setAlreadyExist(true)
    })

    serverListeners.correctUsernameToLogin((socketId: string) => {
      localStorage.setItem(USERNAME_LOCALSTORAGE, usernameRef.current)
      dispatch(authActions.setUsername(usernameRef.current))
      dispatch(authActions.setSocketId(socketId))
      navigate(ROUTER_PATHS.activeUsers)
    })
  }, [])

  const handleSaveUsername = () => {
    if (usernameRef.current === '') return
    serverEvents.login(usernameRef.current)
  }

  const handleChangeUsername = (username: string) => {
    usernameRef.current = username
  }

  return (
    <div className="welcome">
      <div className="welcome__text">Welcome !</div>
      <input
        onKeyPress={e => e.key === 'Enter' && handleSaveUsername()}
        onChange={e => handleChangeUsername(e.target.value)}
        placeholder="Type a username to play..."
        className="welcome__username-input"
      />
      {alreadyExist && <div className="welcome__error">Already exist the username</div>}
      <div onClick={handleSaveUsername} className="welcome__save-username">
        Login
      </div>
    </div>
  )
}

export default WelcomeUser
