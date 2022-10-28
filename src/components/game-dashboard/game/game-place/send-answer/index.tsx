import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { gameActions } from '../../../../../store/reducers/game'
import './index.scss'

const SendAnswer = () => {
  const dispatch = useDispatch()

  const [answer, setAnswer] = useState<string>('')

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
