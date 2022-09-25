import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { routerPaths } from '../../constants'
import { RootState } from '../../store'
import { authActions } from '../../store/reducers/auth'
import './index.scss'

const WelcomeUser = () => {
  const dispatch = useDispatch()
  const authState = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    if (authState.username) navigate(routerPaths.activeUserList)
  }, [])

  const handleSaveUsername = () => {
    if (username === '') return
    dispatch(authActions.setUsername(username))
    navigate(routerPaths.activeUserList)
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
