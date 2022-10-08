import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { GAME_WORDS_LENGTH, MIN_REMAINING_TIME } from '../constants'
import { RootState } from '../store'
import serverEvents from '../utils/server-events'

const useCalculateGamePoint = (remainingTime: number = -1) => {
  const game = useSelector((state: RootState) => state.game)
  const gameRoom = useSelector((state: RootState) => state.gameRoom)
  const auth = useSelector((state: RootState) => state.auth)

  const processCalculatePoint = () => {
    let totalPoint = 0

    if (game.wordUserAnswers.length > 0) {
      totalPoint = game.wordUserAnswers
        .map((word, wordIndex) => {
          const wordUserSplitted = word.split('')
          const wordAnswer = game.wordAnswers[wordIndex].split('')

          return wordAnswer.filter((wordAnswerCharacter, wordAnswerKey) => wordAnswerCharacter === wordUserSplitted[wordAnswerKey]).length
        })
        .reduce((a, b) => a + b)
    }

    serverEvents.sendPointOfUser({ roomId: gameRoom.roomId as string, userSocketId: auth.socketId, point: totalPoint })
  }

  useEffect(() => {
    if (game.currentWordIndex === GAME_WORDS_LENGTH - 1 || remainingTime === MIN_REMAINING_TIME) processCalculatePoint()
  }, [game.currentWordIndex, remainingTime])
}

export default useCalculateGamePoint
