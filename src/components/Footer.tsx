import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import QRCodeGenerator from './QrcodeGerador';


const Footer: React.FC = () => {
    const firstConfig = useSelector((state: RootState) => state.configReducer.config?.[0] || null);


    return (
        <footer>
            <div className='link-info'>
                <br />

                <p>Ver: {firstConfig?.ver} &copy; </p>
                <br />

                
            </div>
            <br />


        </footer>
    );
};

export default Footer;
