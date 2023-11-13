import React from 'react';
import Footer from './Footer';



function TelaLoading() {


    return (
        <>
            <div style={{ height: '99vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'absolute', zIndex: '100', width: '100%' }}>

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

export default TelaLoading;
