'use client';

import { BackdropProps, ErrorModalProps } from '@/shared/types';
import { FC } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import Card from './Card';
import './ErrorModal.css';

const Backdrop: FC<BackdropProps> = ({ onConfirm }) => {
  return <div className="backdrop" onClick={onConfirm} />;
};

const ModalOverlay: FC<ErrorModalProps> = ({ errorMessage, onConfirm }) => {
  return (
    <Card cssName="modal">
      <header className="header">
        <h2>{errorMessage.title}</h2>
      </header>
      <div className="content">
        <p>{errorMessage.message}</p>
      </div>
      <footer className="actions">
        <Button type="button" onClick={onConfirm}>Okay</Button>
      </footer>
    </Card>
  )
};

const ErrorModal: FC<ErrorModalProps> = ({ errorMessage, onConfirm }) => {
  return (
    <>
      {
        createPortal(<Backdrop onConfirm={onConfirm}/>,
        document.getElementById('backdrop-root') as HTMLElement)
      }
      {
        createPortal(<ModalOverlay errorMessage={errorMessage} onConfirm={onConfirm} />,
        document.getElementById('overlay-root') as HTMLElement)
      }
    </>
  )
}
export default ErrorModal;