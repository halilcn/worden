import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import TimeoutServer from '../../components/welcome-user/timeout-server'
import WaitingServer from '../../components/welcome-user/waiting-server'
import Welcome from '../../components/welcome-user/welcome'
import { RootState } from '../../store'
import './index.scss'

enum ActiveContent {
  welcome = 'welcome',
  waitingServer = 'waitingServer',
  timeoutServer = 'timeoutServer',
}

const EXPECTED_MAX_MIN_WAITING_USER = 10

const WelcomeUser = () => {
  const socketServerState = useSelector((state: RootState) => state.socketServer)

  const [timeWaitingUser, setTimeWaitingUser] = useState<number>(0)
  const checkConnectionStatusOfServerIntervalRef = useRef<ReturnType<typeof setInterval>>()

  const [activeContent, setActiveContent] = useState<ActiveContent>(ActiveContent.waitingServer)

  useEffect(() => {
    if (activeContent === ActiveContent.timeoutServer) return

    const checkConnectionStatusOfServer = setInterval(() => {
      if (activeContent === ActiveContent.waitingServer) setTimeWaitingUser(prev => prev + 1)
      if (activeContent === ActiveContent.welcome) clearInterval(checkConnectionStatusOfServerIntervalRef.current)

      setActiveContent(socketServerState.server.connected ? ActiveContent.welcome : ActiveContent.waitingServer)
    }, 1000)

    checkConnectionStatusOfServerIntervalRef.current = checkConnectionStatusOfServer

    return () => clearInterval(checkConnectionStatusOfServerIntervalRef.current)
  }, [activeContent])

  useEffect(() => {
    if (timeWaitingUser === EXPECTED_MAX_MIN_WAITING_USER) {
      setActiveContent(ActiveContent.timeoutServer)
      clearInterval(checkConnectionStatusOfServerIntervalRef.current)
    }
  }, [timeWaitingUser])

  const memorizedActiveContent = useMemo(() => {
    if (activeContent === ActiveContent.welcome) return <Welcome />
    if (activeContent === ActiveContent.waitingServer) return <WaitingServer />
    if (activeContent === ActiveContent.timeoutServer) return <TimeoutServer />
  }, [activeContent])

  return <div className="welcome">{memorizedActiveContent}</div>
}

export default WelcomeUser
