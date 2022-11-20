import Loading from '../../shared/loading'
import './index.scss'

const WaitingServer = () => {
  return (
    <div className="waiting-server">
      <div className="waiting-server__text">connecting to server...</div>
      <Loading />
    </div>
  )
}

export default WaitingServer
