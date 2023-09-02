'use client';

import { ButtonProps } from '@/shared/types/Types';
import { FC } from 'react';
import './Button.css';

const Button: FC<ButtonProps> = ({ type, children }) => {
  return (
    <button
        className="button"
        type={type || 'button'}>
    {children}
    </button>
  )
}
export default Button;