import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ROUTER_PATHS } from '../../constants'
import { RootState } from '../../store'
import { authActions } from '../../store/reducers/auth'
import serverEvents from '../../utils/server-events'
import serverListeners from '../../utils/server-listeners'
import './index.scss'

const WelcomeUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authState = useSelector((state: RootState) => state.auth)

  const [username, setUsername] = useState<string>('')
  const [alreadyExist, setAlreadyExist] = useState<boolean>(false)

  useEffect(() => {
    if (authState.username) navigate(ROUTER_PATHS.activeUsers)

    serverListeners.alreadyExistUsername(() => {
      setAlreadyExist(true)
    })

    serverListeners.correctUsernameToLogin(() => {
      dispatch(authActions.setUsername(username))
      navigate(ROUTER_PATHS.activeUsers)
    })
  }, [])

  const handleSaveUsername = () => {
    if (username === '') return
    serverEvents.login(username)
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
      {alreadyExist && <div className="welcome__error">Already exist the username</div>}
      <div onClick={handleSaveUsername} className="welcome__save-username">
        Login
      </div>
    </div>
  )
}

export default WelcomeUser
