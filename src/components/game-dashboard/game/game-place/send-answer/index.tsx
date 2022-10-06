import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useCalculateGamePoint from '../../../../../hooks/useCalculateGamePoint'
import { RootState } from '../../../../../store'
import { gameActions } from '../../../../../store/reducers/game'
import { gameRoom } from '../../../../../store/reducers/game-room'
import { socketServerActions } from '../../../../../store/reducers/socket-server'
import serverEvents from '../../../../../utils/server-events'
import './index.scss'

const SendAnswer = () => {
  const dispatch = useDispatch()

  const [answer, setAnswer] = useState<string>('')

  useCalculateGamePoint()

  const handleSaveAnswer = (e: any) => {
    if (e.key === 'Enter') {
      dispatch(gameActions.addWordUserAnswer(answer))
      dispatch(gameActions.increaseCurrentWordIndex())
      setAnswer('')
    }
  }

  return (
    <div className="send-answer">
      <input
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        onKeyDown={handleSaveAnswer}
        type="text"
        className="send-answer__input"
      />
      <div className="send-answer__info">You can pass with a blank word</div>
    </div>
  )
}

export default SendAnswer
