import { useEffect, useState } from 'react'

import './index.scss'

const RemainingTime = () => {
  const [remainingTime, setRemainingTime] = useState<number>(120)

  useEffect(() => {
    setInterval(() => {
      setRemainingTime(time => time - 1)
    }, 1000)
  }, [])

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
