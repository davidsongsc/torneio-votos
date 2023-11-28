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
                <br />
                <br />
                <p>Ver:[ {firstConfig?.ver}.{firstConfig?.serial}] </p>
                <br />
                <br />
                <br />
                <QRCodeGenerator link={firstConfig?.webpage} /> &copy;
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />

        </footer>
    );
};

export default Footer;
