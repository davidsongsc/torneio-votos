import React, { useState, useEffect } from 'react';
import Footer from './Footer';

interface CountdownProps {
    deadline: number;
}

function Countdown({ deadline }: CountdownProps) {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    function calculateTimeRemaining() {
        const currentTime = new Date().getTime();
        const remaining = Math.max(0, deadline - currentTime);
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return { hours, minutes, seconds };
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div style={{ height: '99vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'absolute', zIndex: '100', width: '100%' }}>
                <h1> {timeRemaining.hours > 0 && (
                    <div>
                        {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
                    </div>
                )}
                    {timeRemaining.hours === 0 && timeRemaining.minutes > 0 && (
                        <div>
                            {timeRemaining.minutes}m {timeRemaining.seconds}s
                        </div>
                    )}
                    {timeRemaining.hours === 0 && timeRemaining.minutes === 0 && (
                        <div>{timeRemaining.seconds}s</div>
                    )}</h1>
                <div className='contagem-c1'>
                    <div className='contagem-c2'>
                        <div>
                            <div className='contagem' />
                            <div className='contagem-r' />
                        </div>
                        <div>
                            <div className='contagem-x' />
                            <div className='contagem-n' />
                        </div>

                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
}

export default Countdown;
