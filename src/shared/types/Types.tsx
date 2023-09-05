import { ReactNode } from 'react';

export type ButtonProps = {
    type: 'submit' | 'reset' | 'button' | undefined;
    children: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type UsersListProps = {
    users: User[];
};

export type AddUsersProps = {
    onAddUser: any;
};

export type ErrorModalProps = {
    errorMessage: ErrorMessage;
    onConfirm: () => void;
};

export type BackdropProps = {
    onConfirm: () => void;
};

export type WrapperProps = {
    children: ReactNode;
};

export type CardProps = {
    cssName: string;
    children: ReactNode;
  };

export type User = {
    username: string | undefined;
    age: number | undefined;
    id?: string;
};

export type ErrorMessage = {
    title: string;
    message: string;
};