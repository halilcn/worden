import { useSelector } from 'react-redux'

import { RootState } from '../../../../../store'
import './index.scss'

const CurrentWord = () => {
  const game = useSelector((state: RootState) => state.game)

  return <div className="current-word">{game.words[game.currentWordIndex]}</div>
}

export default CurrentWord
