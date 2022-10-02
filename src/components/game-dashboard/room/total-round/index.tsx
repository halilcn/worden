import { useSelector } from 'react-redux'

import { RootState } from '../../../../store'
import './index.scss'

const TotalRound = () => {
  const game = useSelector((state: RootState) => state.game)

  return (
    <div className="total-round">
      <div className="total-round__wrapper">
        <div className="total-round__title">Total Round</div>
        <div className="total-round__circle">
          <div className="total-round__value">{game.totalRound}</div>
        </div>
      </div>
    </div>
  )
}

export default TotalRound
