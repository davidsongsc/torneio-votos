import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

interface QRCodeGeneratorProps {
  link: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ link }) => {
  const [qrCodeValue, setQRCodeValue] = useState('');

  useEffect(() => {
    setQRCodeValue(link);
  }, [link]);

  return (
    <div>
      <QRCode size={300} value={qrCodeValue} />
      <br />
      <br />
      <br />
      <p>Escaneie o QR Code para acessar a página: </p>
      <br />
      <br />
      <br />
      <p style={{textTransform: 'lowercase'}}>{qrCodeValue}</p>
      <br />
      <br />
      <br />
    </div>
  );
};

export default QRCodeGenerator;
