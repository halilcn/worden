import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../../../store'
import serverEvents from '../../../../utils/server-events'
import './index.scss'

const ReadyButton = () => {
  const auth = useSelector((state: RootState) => state.auth)
  const gameRoom = useSelector((state: RootState) => state.gameRoom)
  const game = useSelector((state: RootState) => state.game)

  const [isAlreadyReady, setIsAlreadyReady] = useState<boolean>(false)

  useEffect(() => {
    setIsAlreadyReady(game.readyPlayersForCurrentGame.includes(auth.socketId))
  }, [game.readyPlayersForCurrentGame.length])

  const sendReadyStatusForGame = () => {
    serverEvents.sendReadyStatusForGame({ userSocketId: auth.socketId, roomId: gameRoom.roomId as string })
  }

  return (
    <div className="ready">
      {!isAlreadyReady && (
        <div onClick={sendReadyStatusForGame} className="ready__button">
          Ready !
        </div>
      )}
    </div>
  )
}

export default ReadyButton
