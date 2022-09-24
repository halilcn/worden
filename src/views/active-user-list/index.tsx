import './index.scss';

const ActiveUserList = () => {
  return (
    <div className="active-users">
      <input placeholder="Search an online user by username..." className="active-users__search" />
      <div className="active-users__list">
        <div className="active-users__item active-users__item--idle">
          <div className="active-users__username">
            my username
          </div>
          <div className="active-users__status active-users__status--idle">
            idle
          </div>
        </div>
        <div className="active-users__item ">
          <div className="active-users__username">
            my username
          </div>
          <div className="active-users__status active-users__status--busy">
            busy
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveUserList;
