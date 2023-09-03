'use client';

import { User } from '@/shared/types/Types';
import { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';
import './globals.css';

const Home = ({ }): JSX.Element => {
  const [usersList, setUsersList] = useState<User[]>([]);

  const addUserHandler = (username: string, age: number) => {
    setUsersList((prevValue: User[]) => {
      return [
          ...prevValue,
          { username: username, age: age, id: Math.random().toString() }
      ]
  });
  }

  return (
    <div>
      <AddUser onAddUser={addUserHandler}/>
      <UsersList users={usersList}/>
    </div>
  )
}
export default Home;