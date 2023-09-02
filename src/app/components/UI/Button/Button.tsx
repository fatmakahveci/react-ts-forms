'use client';

import { FC, ReactNode } from 'react';
import './Button.css';

interface Props {
    type: 'submit' | 'reset' | 'button' | undefined,
    children: ReactNode
};

const Button: FC<Props> = ({ type, children }) => {
  return (
    <button
        className="button"
        type={type || 'button'}>
    {children}
    </button>
  )
}
export default Button;