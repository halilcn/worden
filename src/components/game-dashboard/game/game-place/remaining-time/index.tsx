import { useEffect, useState } from 'react'

import { MAX_REMAINING_TIME, MIN_REMAINING_TIME } from '../../../../../constants'
import useCalculateGamePoint from '../../../../../hooks/useCalculateGamePoint'
import './index.scss'

const RemainingTime = () => {
  const [remainingTime, setRemainingTime] = useState<number>(MAX_REMAINING_TIME)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(time => time - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useCalculateGamePoint(remainingTime)

  //TODO: remaining time error ?

  /* useEffect(() => {
    if (remainingTime === MIN_REMAINING_TIME) {

    }
  }, [remainingTime])*/

  return (
    <div className="remaining-time">
      <div className="remaining-time__number">{remainingTime}</div>
      <div className="remaining-time__bar">
        <div style={{ width: `${remainingTime - 20}%` }} className="remaining-time__current-time-bar" />
      </div>
    </div>
  )
}

export default RemainingTime
