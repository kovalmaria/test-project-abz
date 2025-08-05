import { useEffect, useRef, useState } from 'react';
import { getUsers } from './api';
import './App.scss';

import { Header } from "./components/Header/Header"
import { Hero } from './components/Hero/Hero';
import { RegistrationForm } from './components/RegistrationForm/RegistrationForm';
import { UserList } from './components/UsersList/UserList';
import { Loader } from './components/Loader/Loader';

export const App = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const usersListRef = useRef();

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async() => {
    setIsLoading(true);
    try {
      const data = await getUsers(page);
      setUsers(prev => [...prev, ...data.users]);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleRegistrationSuccess = () => {
    setPage(1);
    setUsers([]);
    // If current page is 1 useEffect will not be triggered, therefore loadUsers called directly
    if (page === 1) loadUsers();
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <Header />
      <Hero />
      <UserList 
        users={users}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        ref={usersListRef}
      />
      <RegistrationForm 
        onSuccess={handleRegistrationSuccess} 
        usersListRef={usersListRef}
        setIsLoading={setIsLoading}
      />
    </>
  )
}