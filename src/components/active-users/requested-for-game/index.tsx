import Loading from '../../shared/loading'
import './index.scss'

const RequestedForGame = () => {
  return (
    <div className="requested-game">
      <div className="requested-game__text">Waiting for user...</div>
      <Loading />
      <div className="requested-game__cancel">Cancel</div>
    </div>
  )
}

export default RequestedForGame
