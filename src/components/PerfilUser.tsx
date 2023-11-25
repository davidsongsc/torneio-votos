import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { RootState } from '../reducers';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import { AppDispatch } from '../store'; // Substitua pelo caminho correto para a sua store
import axios from 'axios';
import { API_IMAGEM_UPLOAD } from '../actions/types';

const PerfilUser: React.FC = () => {
    const userLogin = useSelector((state: RootState) => state.userReducer);
    const { userInfo } = userLogin;
    const dispatch: AppDispatch = useDispatch(); // Use o tipo AppDispatch aqui
    const { isLoggedIn } = userLogin;
    const limite = 118;
    const imagens = [];
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);


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

    const handleLogout = () => {
        dispatch(logoutUser());
    };

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
                console.log('Upload de imagem bem-sucedido:', response.data);
            } catch (error) {
                console.error('Erro ao fazer upload de imagem:', error);
            }
        } else {
            console.log('Nenhuma imagem selecionada');
        }
    };

    if (!userLogin) {
        return <div>Funcionário não encontrado</div>;
    }

    return (
        <div className='perfil-container'>
            <div>
                <br />
                <br />
                <div className='painel'></div>
                <img className='perfil-image' src={`https://bz97.pythonanywhere.com/static/img/${userInfo?.imagem}`} alt={`${userInfo?.matricula}`} />
                <div className='perfil-botoes-img'>
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
            <button onClick={handleLogout} style={{ display: `${!isLoggedIn ? 'none' : ''}` }}>Desconectar</button>
        </div>
    );
};

export default PerfilUser;
