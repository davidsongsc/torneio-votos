import React from 'react';
import AlterarSenha from './AlterarSenha';
const largura = '500px';
const PageRegulamento: React.FC = () => {
    return (
        <>
        <div className="regras-container" >
        <h2>Usuario Autenticado</h2>
        <br />
        <div>
            <h3>
                Como acessar?
            </h3>
            <h4>
                Primeiro:
            </h4>
            <ul>
                <li> <img src="https://bz97.pythonanywhere.com/static/img/p1.png" alt="img 1" width={largura}/></li>
                <li> <img src="https://bz97.pythonanywhere.com/static/img/p2.png" alt="img 1" width={largura}/></li>
                <li> <img src="https://bz97.pythonanywhere.com/static/img/p3.png" alt="img 1" width={largura}/></li>
                
            </ul>
            
            
        </div>

    </div>
    <AlterarSenha/>
    </>
    );
};

export default PageRegulamento;
