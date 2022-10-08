import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GAME_WORDS_LENGTH, MIN_REMAINING_TIME } from '../constants'
import store, { RootState } from '../store'
import { gameActions } from '../store/reducers/game'
import serverEvents from '../utils/server-events'

//TODO: ? -1 default ?
const useCalculateGamePoint = (remainingTime: number = -1) => {
  const dispatch = useDispatch()

  const game = useSelector((state: RootState) => state.game)
  const gameRoom = useSelector((state: RootState) => state.gameRoom)
  const auth = useSelector((state: RootState) => state.auth)

  const processCalculatePoint = () => {
    //TODO: review
    const totalPoint =
      game.wordUserAnswers.length === 0
        ? 0
        : game.wordUserAnswers
            .map((word, wordIndex) => {
              const wordUserSplitted = word.split('')
              const wordAnswer = game.wordAnswers[wordIndex].split('')

              return wordAnswer.filter((wordAnswerCharacter, wordAnswerKey) => wordAnswerCharacter === wordUserSplitted[wordAnswerKey])
                .length
            })
            .reduce((a, b) => a + b)

    console.log(totalPoint)

    serverEvents.sendPointOfUser({ roomId: gameRoom.roomId as string, userSocketId: auth.socketId, point: totalPoint })
  }

  useEffect(() => {
    if (game.currentWordIndex === GAME_WORDS_LENGTH - 1) processCalculatePoint()
    if (remainingTime === MIN_REMAINING_TIME) processCalculatePoint()
  }, [game.currentWordIndex, remainingTime])
}

export default useCalculateGamePoint
