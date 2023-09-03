'use client';

import { INITIAL_USER } from '@/shared/types/Constants';
import { User } from '@/shared/types/Types';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import './AddUser.css';

const AddUser: FC = (): JSX.Element => {
    const [user, setUser] = useState<User> (INITIAL_USER);

    const addUserHandler = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!user || !user.username || user.username.trim().length === 0 || !user.age || +user.age < 1) {
            return;
        }
        console.log(user.username, user.age);
        setUser(INITIAL_USER);
    }

    const usernameChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setUser({ ...user, username: e.target.value });
    };

    const ageChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        if (isNaN(+e.target.value)) {
            alert('Age must be a number');
            return;
        } else {
            setUser({ ...user, age: +e.target.value });
        }
    };

    return (
        <Card cssName="input">
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={user.username || ''}
                    onChange={usernameChangeHandler}>
                </input>
                <label htmlFor="age">Age (Years)</label>
                <input
                    id="age"
                    type="text"
                    value={user.age !== undefined ? user.age.toString() : ''}
                    onChange={ageChangeHandler}>
                </input>
                <Button type="submit">Add User</Button>
            </form>
        </Card>
    )
}
export default AddUser;