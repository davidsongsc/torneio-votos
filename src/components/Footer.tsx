import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className='link-ranking'>
                <img src="https://dagesico.pythonanywhere.com/static/img/qrcode.png" alt="QR Code Ranking" />
            </div>

            <div className='link-info'>
                <p>BZ97 Via Park - Outback  &copy; <span id="anoAtual"> 2023</span> </p>
                <p>Versão: 1.03f <blockquote>14461/011200-3</blockquote> </p>
                <p>UPDATE: <blockquote>10/11</blockquote> </p>
            </div>




        </footer>
    );
};

export default Footer;
