'use client';

import { ChangeEvent, FC, FormEvent, useState } from 'react';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';

import './AddUser.css';

const AddUser: FC = (): JSX.Element => {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');

    const addUserHandler: any = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if ( username.trim().length === 0 || age.trim().length === 0 || +age < 1) {
            return;
        }
        setUsername('');
        setAge('');
    }

    const usernameChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setUsername(e.target.value);
    };

    const ageChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setAge(e.target.value);
    };

    return (
        <Card cssName="input">
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={usernameChangeHandler}>
                </input>
                <label htmlFor="age">Age (Years)</label>
                <input
                    id="age"
                    type="text"
                    value={age}
                    onChange={ageChangeHandler}>
                </input>
                <Button type="submit">Add User</Button>
            </form>
        </Card>
    )
}
export default AddUser;