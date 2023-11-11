import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

const Footer: React.FC = () => {
    const firstConfig = useSelector((state: RootState) => state.configReducer.config?.[0] || null);

    return (
        <footer>
            <div className='link-info'>
                <p>Versão: {firstConfig?.ver} &copy; </p>
            </div>
            <div className='link-ranking'>
                <img src="https://dagesico.pythonanywhere.com/static/img/qrcode.png" alt="QR Code Ranking" />
            </div>


        </footer>
    );
};

export default Footer;
