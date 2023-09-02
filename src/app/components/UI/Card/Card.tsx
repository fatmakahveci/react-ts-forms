'use client';

import { FC, ReactNode } from 'react';
import './Card.css';

type Props = {
  cssName: string;
  children: ReactNode;
};

const Card: FC<Props> = ({ cssName, children }) => {
  return (
    <div className={`card ${cssName}`}>
        {children}
    </div>
  )
}
export default Card;