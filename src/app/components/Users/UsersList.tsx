'use client';

import Card from '@/app/components/UI/Card';
import { UsersListProps } from '@/shared/types/Types';
import { FC } from 'react';
import './UsersList.css';

const UsersList: FC<UsersListProps> = ({users}) => {
  return (
    <Card cssName="users">
      <ul>
        { users.map((user) => (
            <li key={user.id}>
              {user.username} ({user.age} years old.)
            </li>
          ))}
      </ul>
    </Card>
  )
}
export default UsersList;