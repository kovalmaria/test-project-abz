import { Tooltip } from '../Tooltip/Tooltip';
import './UserCard.scss';

export const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className='user-card__main-info'>
        <img
          src={user.photo}
          alt={user.name}
          className="user-card__main-info--photo"
          loading="lazy"
        />
        <Tooltip text={user.name}/>
      </div>
      <div className='user-card__contact'>
        <Tooltip text={user.position}/>
        <Tooltip text={user.email}/>
        <Tooltip text={user.phone}/>
      </div>
    </div>
  );
}
