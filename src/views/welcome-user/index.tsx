import { useMemo, useState } from 'react'
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

const WelcomeUser = () => {
  const socketServerState = useSelector((state: RootState) => state.socketServer)

  const [activeContent, setActiveContent] = useState<ActiveContent>(ActiveContent.timeoutServer)

  const memorizedActiveContent = useMemo(() => {
    if (activeContent === ActiveContent.welcome) return <Welcome />
    if (activeContent === ActiveContent.waitingServer) return <WaitingServer />
    if (activeContent === ActiveContent.timeoutServer) return <TimeoutServer />
  }, [activeContent])

  return <div className="welcome">{memorizedActiveContent}</div>
}

export default WelcomeUser
