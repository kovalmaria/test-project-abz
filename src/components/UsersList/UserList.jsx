import './UserList.scss';
import { Button } from '../Button/Button';
import { UserCard } from '../UserCard/UserCard';


export const UserList = ({ users, page, totalPages, setPage}) => {
  const handleShowMore = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <section className="user-list" id="users">
      <h1 className="user-list__title">Working with GET request</h1>
      <div className="user-list__cards">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <Button disabled={page >= totalPages} onClick={handleShowMore}>Show more</Button>
    </section>
  )
}
