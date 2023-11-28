import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../reducers';

const NavPrep: React.FC = () => {
  const modoOperacional = useSelector((state: RootState) => state.configReducer.config?.[0] || null);
  const deadline = new Date(modoOperacional.prazoManutencao).getTime();
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const currentTime = new Date().getTime();
    const remaining = Math.max(0, deadline - currentTime);

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: '999',
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        fontSize: '11px',
        letterSpacing: '8px',
      }}
    >
      <h1>
        <FontAwesomeIcon color='yellow' icon={faExclamationTriangle} /> {timeRemaining.days}D/{timeRemaining.hours}:
        {timeRemaining.minutes}:{timeRemaining.seconds}
      </h1>
    </nav>
  );
};

export default NavPrep;
