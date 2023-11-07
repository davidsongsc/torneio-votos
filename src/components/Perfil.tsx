import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { RootState } from '../reducers'; // Substitua pelo caminho correto
import { useSelector } from 'react-redux';


const Perfil: React.FC = () => {
    const employees = useSelector((state: RootState) => state.usuariosReducer.usuarios);

    const { id } = useParams<{ id?: string }>();
    const employee = employees.find((emp) => emp.id === parseInt(id || '', 10));

    if (!employee) {
        return <div>Funcionário não encontrado</div>;
    }

    return (
        <div className='perfil-container'>
            <h2 className='perfil-name'>Perfil</h2>
            <img className='perfil-image' src={`https://dagesico.pythonanywhere.com/static/img/perfil.jpg`} alt={employee.name} />
            <h3>{employee.name}</h3>
            <p>Tag: {employee.alcunha}</p>
            <Link to="/">Ir para Inicio</Link>
        </div>
    );
};

export default Perfil;
