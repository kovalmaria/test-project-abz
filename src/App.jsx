import { useEffect, useState } from 'react';
import { getUsers } from './api';
import './App.scss';

import { Header } from "./components/Header/Header"
import { Hero } from './components/Hero/Hero';
import { RegistrationForm } from './components/RegistrationForm/RegistrationForm';
import { UserList } from './components/UsersList/UserList';

export const App = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = () => {
    getUsers(page)
      .then((data) => {
        setUsers(prev => [...prev, ...data.users]);
        setTotalPages(data.total_pages);
      })
      .catch((error) => {
        console.error('Failed to load users:', error);
      });
  }

  const handleRegistrationSuccess = () => {
    setPage(1);
    setUsers([]);
    // If current page is 1 useEffect will not be triggered
    if (page === 1) loadUsers();
  };

  return (
    <>
    <Header />
    <Hero />
    <UserList users={users} page={page} totalPages={totalPages} setPage={setPage}/>
    <RegistrationForm onSuccess={handleRegistrationSuccess}/>
    </>
  )
}