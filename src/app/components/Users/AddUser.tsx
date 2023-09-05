'use client';

import { INITIAL_USER } from '@/shared/types/Constants';
import { AddUsersProps, ErrorMessage, User } from '@/shared/types/Types';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import Wrapper from '@/app/components/Helpers/Wrapper';
import Button from '@/app/components/UI/Button';
import Card from '@/app/components/UI/Card';
import ErrorModal from '@/app/components/UI/ErrorModal';
import './AddUser.css';

const AddUser: FC<AddUsersProps> = ({ onAddUser }): JSX.Element => {
    const [user, setUser] = useState<User>(INITIAL_USER);
    const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
    
    const addUserHandler = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!user.username || user.username.trim().length === 0 || !user.age) {
            setErrorMessage({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            });
            return;
        }
        if (+user.age < 12) {
            setErrorMessage({
                title: 'Invalid age',
                message: 'Please enter a valid age (+12).'
            });
            return;
        }
        onAddUser(user.username, user.age);
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

    const errorHandler = () => {
        setErrorMessage(null);
    };

    return (
        <Wrapper>
            {errorMessage && <ErrorModal errorMessage={errorMessage} onConfirm={errorHandler}/>}
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
        </Wrapper>
    )
}
export default AddUser;