import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { RootState } from '../reducers'; // Substitua pelo caminho correto
import { useSelector } from 'react-redux';


const Perfil: React.FC = () => {
    const employees = useSelector((state: RootState) => state.userReducer.users);

    const { id } = useParams<{ id?: string }>();
    const employee = employees.find((emp) => emp.id === parseInt(id || '', 10));

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

                <br /><br />
                <div>
                    <p> {employee?.alcunha}</p>
                    <p>Matricula: {employee?.id}</p>
                    <br />
                    <p>Votos Recebidos: {employee?.votosRecebidos}</p>
                    <p>Votos Emitidos: {employee?.votosEmitidos}</p>
                    <br /><br />
                </div>
                <Link to="/ranking"><button>Voltar</button></Link>
            </div>
        </div>
    );
};

export default Perfil;
