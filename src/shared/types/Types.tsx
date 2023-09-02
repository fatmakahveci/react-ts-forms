import { ReactNode } from 'react';

export type ButtonProps = {
    type: 'submit' | 'reset' | 'button' | undefined;
    children: ReactNode;
};

export type User = {
    username: string | undefined;
    age: number | undefined;
};