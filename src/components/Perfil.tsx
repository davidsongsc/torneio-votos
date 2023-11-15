import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RootState } from '../reducers'; // Substitua pelo caminho correto
import { useSelector } from 'react-redux';


const Perfil: React.FC = () => {
    const employees = useSelector((state: RootState) => state.userReducer.users);
    const { id } = useParams<{ id?: string }>();
    const employee = employees.find((emp) => emp.id === parseInt(id || '', 10));
    useEffect(() => {
        // Rolando para o topo da página quando o componente é montado
        window.scrollTo(0, 0);
    }, []);
    if (!employee) {
        return <div>Funcionário não encontrado</div>;
    }

    return (
        <div className='perfil-container'>
            <br />
            <br />
            <div className='painel'></div>
            <h2 className='perfil-name'>Perfil</h2>
            <img className='perfil-image' src={`https://dagesico.pythonanywhere.com/static/img/${employee.imagem}`} alt={employee.nome} />
            <div className='info'>
                <h3>{employee.nome}</h3>
                <p style={{ textTransform: 'initial' }}>{employee?.votosRecebidos === 0 ? 'Não recebeu voto' : `Recebeu ${employee?.votosRecebidos} voto`} e {employee?.votosEmitidos === 0 ? 'não votou ainda...' : `votou ${employee?.votosEmitidos} vezes.`}
                    <blockquote>
                        {employee?.votos === 0 ? 'Não possui votos!' : <>Possui {employee?.votos} votos!</>}
                    </blockquote>
                </p>
                <br />
                
                <br />
                <div>
                    <p> {employee?.alcunha}</p>
                    <br />

                    <br />

                    <Link to="/ranking"><button>Voltar</button></Link>
                    <br />
                </div>

            </div>
        </div>
    );
};

export default Perfil;
