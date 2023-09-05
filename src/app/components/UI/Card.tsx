'use client';

import { FC } from 'react';
import { CardProps } from '@/shared/types/Types';
import './Card.css';

const Card: FC<CardProps> = ({ cssName, children }) => {
  return (
    <div className={`card ${cssName}`}>
        {children}
    </div>
  )
}
export default Card;