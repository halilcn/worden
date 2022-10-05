import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../../../../store'
import { gameActions } from '../../../../../store/reducers/game'
import './index.scss'

const SendAnswer = () => {
  const dispatch = useDispatch()
  const game = useSelector((state: RootState) => state.game)

  const [answer, setAnswer] = useState<string>('')

  useEffect(() => {
    if (game.currentWordIndex >= 3) {
      //todo: test mode on
      //todo: calculate! hooks ?

      const test = game.wordUserAnswers.map((word, wordIndex) => {
        const wordUserSplitted = word.split('')
        const wordAnswer = game.wordAnswers[wordIndex].split('')

        return wordAnswer.filter((wordAnswerCharacter, wordAnswerKey) => wordAnswerCharacter === wordUserSplitted[wordAnswerKey]).length
      })

      console.log(test)
    }
  }, [game.currentWordIndex])

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
