'use client';

import React, { FC, FormEvent } from 'react';
import Card from '../../UI/Card/Card';
import './AddUser.css';

const AddUser: FC = (): JSX.Element => {
    const addUserHandler: any = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    }

    return (
        <Card cssName="input">
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text"></input>
                <label htmlFor="age">Age (Years)</label>
                <input id="age" type="text"></input>
                <button type="submit">Add User</button>
            </form>
        </Card>
    )
}
export default AddUser;