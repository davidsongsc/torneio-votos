import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

const PageOutros: React.FC = () => {
    const userLogin = useSelector((state: RootState) => state.userReducer);
    const { userInfo } = userLogin;
    const handleInstall = () => {
        // Obtenha o prompt de instalação do Service Worker
        let deferredPrompt: any = null;

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./service-worker.js')
                .then((registration) => {
                    console.log('Service Worker registrado com sucesso:', registration);

                    window.addEventListener('beforeinstallprompt', (event) => {
                        // Armazene o prompt para uso posterior
                        deferredPrompt = event as Event;
                    });
                })
                .catch((error) => {
                    console.error('Erro ao registrar o Service Worker:', error);
                });
        }

        if (deferredPrompt) {
            (deferredPrompt as any).prompt();

            (deferredPrompt as any).userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Usuário aceitou a instalação');
                } else {
                    console.log('Usuário recusou a instalação');
                }
            });

            deferredPrompt = null;
        }
    };


    return (
        <div className="sitemap">
            <br />
            <ul>
                <h3>APLICATIVO</h3>
                <li>
                    <Link to="/codigoacesso"><button>Alterar Codigo</button></Link>
                </li>
                <li>
                    <Link to="/regras"><button>Regulamento</button></Link>
                </li>

                {(userInfo?.alcunha && userInfo.alcunha.toLowerCase().includes('gerencia')) || (userInfo?.matricula === 970016 && (
                    <>
                        <li>
                            <button>
                                <a href="https://bz97.pythonanywhere.com/admin/">Banco de dados</a>
                            </button>
                        </li>
                 
                    </>
                ))}

            </ul>

        </div>
    );
};

export default PageOutros;
