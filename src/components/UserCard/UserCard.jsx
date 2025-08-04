import './UserCard.scss';

export const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className='user-card__main-info'>
        <img
          src={user.photo}
          alt={user.name}
          className="user-card__main-info--photo"
        />
        <p className="user-card__main-info--name" title={user.name}>
          {user.name}
        </p>
      </div>
      <div className='user-card__contact'>
        <p
          className="user-card__contact--position"
          title={user.position}
        >
          {user.position}
        </p>
        <p
          className="user-card__contact--email"
          title={user.email}
        >
          {user.email}
        </p>
        <p className="user-card__contact--phone">{user.phone}</p>
      </div>
    </div>
  );
}
