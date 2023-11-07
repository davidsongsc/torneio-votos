import React from 'react';
import { useParams, Link } from 'react-router-dom';


interface Person {
    id: number;
    name: string;
    alcunha: string;
    imagem: string;
    votes: number;
}

const employees: Person[] = [
    { id: 1, name: 'Belisazrio Borba', alcunha: 'presidente', imagem: 'perfil', votes: 15 },
    { id: 2, name: 'Cipliano Pinto', alcunha: '', imagem: 'perfil', votes: 10 },
    { id: 3, name: 'Maria Manoela', alcunha: '', imagem: 'perfil', votes: 5 },
    { id: 4, name: 'Lucia Cleides', alcunha: '', imagem: 'perfil', votes: 8 },
    { id: 5, name: 'Marta Rosa', alcunha: '', imagem: 'perfil', votes: 3 },
    { id: 6, name: 'Eliane Leonel', alcunha: '', imagem: 'perfil', votes: 10 },
    { id: 7, name: 'Bruna Carla', alcunha: '', imagem: 'perfil', votes: 5 },
    { id: 8, name: 'Mauricio de souza ', alcunha: '', imagem: 'perfil', votes: 8 },
    { id: 9, name: 'George Neto', alcunha: '', imagem: 'perfil', votes: 1 },
    // Adicione mais pessoas conforme necessário
];
const Perfil: React.FC = () => {
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
            <p>Conhecido como: {employee.alcunha}</p>
            <Link to="/">Ir para Inicio</Link>
        </div>
    );
};

export default Perfil;
