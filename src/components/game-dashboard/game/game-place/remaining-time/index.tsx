import { useEffect, useState } from 'react'

import { MAX_REMAINING_TIME } from '../../../../../constants'
import useCalculateGamePoint from '../../../../../hooks/useCalculateGamePoint'
import './index.scss'

const RemainingTime = () => {
  const [remainingTime, setRemainingTime] = useState<number>(MAX_REMAINING_TIME)

  useCalculateGamePoint(remainingTime)

  useEffect(() => {
    const intervalRemainingTime = setInterval(() => {
      setRemainingTime(time => time - 0.5)
    }, 500)

    return () => clearInterval(intervalRemainingTime)
  }, [])

  const calculateRemainingPercentage = (time: number) => {
    return (time * 100) / MAX_REMAINING_TIME
  }

  return (
    <div className="remaining-time">
      <div className="remaining-time__number">{remainingTime.toFixed(0)}</div>
      <div className="remaining-time__bar">
        <div style={{ width: `${calculateRemainingPercentage(remainingTime)}%` }} className="remaining-time__current-time-bar" />
      </div>
    </div>
  )
}

export default RemainingTime
