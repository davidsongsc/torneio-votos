import React from 'react';

interface ConfirmVotoProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
  }
  
  const ConfirmVoto: React.FC<ConfirmVotoProps> = ({ open, onClose, onConfirm, message }) => {
    if (!open) return null;
  
    return (
      <div className="confirm-voto">
        <div className="confirm-voto-content">
          <p>{message}</p>
          <button onClick={onConfirm}>Confirmar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    );
  };

export default ConfirmVoto;
