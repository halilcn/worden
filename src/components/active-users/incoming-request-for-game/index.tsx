import WaitBird from "../../shared/wait-bird";
import './index.scss'

const IncomingRequestForGame = () => {
  return (
    <div className="incoming-request-game">
      <div className="incoming-request-game__text">A user sent you a game request !</div>
      <WaitBird/>
      <div className="incoming-request-game__actions">
        <div className="incoming-request-game__action-button incoming-request-game__action-button--reject">
          reject
        </div>
        <div className="incoming-request-game__action-button incoming-request-game__action-button--accept">
          accept
        </div>
      </div>
    </div>
  )
}

export default IncomingRequestForGame
