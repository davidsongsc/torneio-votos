import React from 'react';
// Definindo um tipo arrayVoto

// Em seguida, use-o na sua interface ConfirmVotoProps
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
            <h2>Confirmação de Voto</h2>
            <div className="confirm-voto-content">
                <div>
                    <p> Após realizar a confirmação, seu voto será publicado na urna histórica. Não será possível remover ou anular o voto. Lembre-se de que apenas no próximo mês o sistema de votos será reiniciado.</p>
                    <p> Seu voto é importante para nós e contribui para a transparência e integridade do processo de votação. Obrigado por participar!</p>
                    <br />
                    <p>{message}</p>
                </div>
                <div>
                    <button onClick={onConfirm}>Confirmar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmVoto;
