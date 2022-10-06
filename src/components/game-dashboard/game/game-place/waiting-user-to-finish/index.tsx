import WaitUser from '../../../../shared/wait-user'
import './index.scss'

const WaitingUserToFinish = () => {
  return (
    <div className="waiting-user-to-finish">
      <WaitUser />
      <div className="waiting-user-to-finish__text">Waiting for the player to finish the game...</div>
    </div>
  )
}

export default WaitingUserToFinish
