import { useEffect } from 'react'

import serverListeners from '../../../../utils/server-listeners'
import CurrentWord from './current-word'
import './index.scss'
import RemainingTime from './remaining-time'
import SendAnswer from './send-answer'
import WaitingUserToFinish from './waiting-user-to-finish'

const GamePlace = () => {
  useEffect(() => {
    serverListeners.pointOfUser(payload => {
      console.log(payload)
      //todo: burada pointleri koy
    })
  }, [])

  //todo: rakip bekleniyor
  return (
    <div className="game-place">
      <RemainingTime />
      <CurrentWord />
      <SendAnswer />
      <WaitingUserToFinish />
    </div>
  )
}

export default GamePlace
