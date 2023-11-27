import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import QRCodeGenerator from './QrcodeGerador';


const Footer: React.FC = () => {
    const firstConfig = useSelector((state: RootState) => state.configReducer.config?.[0] || null);


    return (
        <footer>
            <div className='link-info'>
                <p>Versão: {firstConfig?.ver} &copy;</p>
                <QRCodeGenerator link={firstConfig?.webpage} /> 
                <p>Serial: {firstConfig?.serial} &reg;</p>

            </div>
        </footer>
    );
};

export default Footer;
