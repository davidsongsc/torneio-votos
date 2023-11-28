import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { RootState } from '../reducers';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import { AppDispatch } from '../store'; // Substitua pelo caminho correto para a sua store
import axios from 'axios';
import { API_IMAGEM_UPLOAD } from '../actions/types';
import { fetchUsers } from '../actions/userActions';

const PerfilUser: React.FC = () => {
    const navigate = useNavigate();
    const userLogin = useSelector((state: RootState) => state.userReducer);
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    const dispatch: AppDispatch = useDispatch(); // Use o tipo AppDispatch aqui
    const limite = 118;
    const imagens = [];
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageVersion, setImageVersion] = useState<number>(0);

    for (let i = 63; i <= limite; i++) {
        imagens.push(`http://www.pinstar.com.br/imagens/pins/views/${i}.jpg`);
    }

    for (let x = 498; x <= 525; x++) {
        imagens.push(`http://www.pinstar.com.br/imagens/pins/views/${x}.jpg`);
    }
    for (let x = 441; x <= 455; x++) {
        imagens.push(`http://www.pinstar.com.br/imagens/pins/views/${x}.jpg`);
    }

    useEffect(() => {
        // Rolando para o topo da página quando o componente é montado
        window.scrollTo(0, 0);
    }, []);



    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const selectedFile = files[0];

            // Verifique se o tipo do arquivo é JPEG
            if (selectedFile.type !== 'image/jpeg') {
                alert('Por favor, selecione um arquivo de imagem JPEG.');
                // Limpe o valor do input para desmarcar o arquivo inválido
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                return;
            }

            setSelectedFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);

            // Adicione o novo nome do arquivo ao FormData
            formData.append('new_filename', `${userInfo?.matricula}.jpg` || '');

            try {
                const response = await axios.post(API_IMAGEM_UPLOAD, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // Atualize o estado com a URL da imagem após o upload bem-sucedido
                setImageVersion(imageVersion + 1);

                console.log('Upload de imagem bem-sucedido:', response.data);
                dispatch(logoutUser());
                navigate('/login');

            } catch (error) {
                console.error('Erro ao fazer upload de imagem:', error);
            }
        } else {
            console.log('Nenhuma imagem selecionada');
        }
    };

    useEffect(() => {
        // Rolando para o topo da página quando o componente é montado
        window.scrollTo(0, 0);

        // Atualizando dados do usuário após um upload bem-sucedido
        const fetchData = async () => {
            try {
                await Promise.all([dispatch(fetchUsers())]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [imageVersion]);

    useEffect(() => {
       if (!userInfo){
        navigate('/ranking');
       }
    }, [userInfo, navigate]);

    if (!userInfo) {
        return <div>Funcionário não encontrado</div>;
    }

    return (
        <div className='perfil-container'>
            <div>
                <br />
                <br />
                <div className='painel'></div>
                <img
                    className='perfil-image'
                    src={`https://bz97.pythonanywhere.com/static/img/${userInfo?.imagem}?v=${imageVersion}`}
                    alt={`${userInfo?.matricula}`}
                />
                <div className='perfil-botoes-img' style={{
                    display: `${userInfo?.imagem === 'perfil.jpg' ?
                        'block'
                        :
                        'none'}`
                }}>
                    <input type="file" accept="image/jpeg" onChange={handleFileChange} />
                    <button onClick={handleUpload} >Enviar Imagem</button>
                </div>
                <div className='info'>
                    <br />
                    <h3>{userInfo?.nome}</h3>
                    <br /><br />
                    <div>
                        <p> {userInfo?.alcunha}</p>
                        <p>Matricula: {userInfo?.matricula}</p>
                        <br />

                    </div>
                    {userInfo?.matricula === 970016 && (
                        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px', height: '300px', overflowY: 'auto', boxShadow: '1px 1px 1px white' }}>
                            {imagens.map((url, index) => (
                                <img key={index} src={url} alt={`Imagem ${index}`} width={'50px'} />
                            ))}
                        </div>
                    )}

                    {/* Adiciona o componente de upload de imagem */}


                </div>
            </div>
        </div>
    );
};

export default PerfilUser;
