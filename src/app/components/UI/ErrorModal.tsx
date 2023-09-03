'use client';

import { ErrorMessage, ErrorModalProps } from '@/shared/types/Types';
import { FC } from 'react';
import Button from './Button';
import Card from './Card';

const ErrorModal: FC<ErrorModalProps> = ({ errorMessage, onConfirm }) => {
  return (
    <div>
      <div className="backdrop" onClick={onConfirm}>
        <Card cssName="modal">
          <header className="header">
            <h2>{errorMessage.title}</h2>
          </header>
          <div className="content">
            <p>{errorMessage.message}</p>
          </div>
          <footer className="actions">
            <Button type="submit">Okay</Button>
          </footer>
        </Card>
      </div>
    </div>
  )
}
export default ErrorModal;