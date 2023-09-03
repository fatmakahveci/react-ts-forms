import { ReactNode } from 'react';

export type ButtonProps = {
    type: 'submit' | 'reset' | 'button' | undefined;
    children: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

export type UsersListProps = {
    users: User[];
};

export type AddUsersProps = {
    onAddUser: any;
};

export type ErrorMessage = {
    title: string;
    message: string;
};

export type ErrorModalProps = {
    errorMessage: ErrorMessage;
    onConfirm: any;
};

export type User = {
    username: string | undefined;
    age: number | undefined;
    id?: string;
};