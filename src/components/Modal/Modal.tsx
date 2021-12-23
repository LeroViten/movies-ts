import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

interface IModalProps {
  children: React.ReactNode;
  onToggle: () => void;
}

const modalRoot = document.querySelector('#modal-root') as HTMLElement;

export default function Modal({ children, onToggle }: IModalProps) {
  const [domReady, setDomReady] = useState(false);

  // custom add/remove event listener for keydown:
  useEffect(function setUpListener() {
    setDomReady(true);
    window.addEventListener('keydown', handleKeyDown);
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        onToggle();
      }
    }

    return function cleanUpKeyDown() {
      setDomReady(false);
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleBackdropClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget === event.target) {
      onToggle();
    }
  };

  return domReady
    ? createPortal(
        <div className="Modal__backdrop" onClick={handleBackdropClick}>
          <div className="Modal__content">{children}</div>
        </div>,
        modalRoot
      )
    : null;
}
