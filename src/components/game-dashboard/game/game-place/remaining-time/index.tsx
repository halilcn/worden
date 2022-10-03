import './index.scss'

const RemainingTime = () => {
  return (
    <div className="remaining-time">
      <div className="remaining-time__number">120</div>
      <div className="remaining-time__bar">
        <div className="remaining-time__current-time-bar" />
      </div>
    </div>
  )
}

export default RemainingTime
