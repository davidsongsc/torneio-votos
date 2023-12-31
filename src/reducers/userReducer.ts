// userReducer.js
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    FETCH_MOST_VOTED_REQUEST,
    FETCH_MOST_VOTED_SUCCESS,
    FETCH_MOST_VOTED_FAILURE,
    UPDATE_LISTA_VOTOS,
    LOGOUT,
    CONCRETIZAR_VOTO_SUCESSO,
    CONCRETIZAR_VOTO_INICIO,
    CONCRETIZAR_VOTO_FALHA,
    CONCRETIZAR_VOTO,
    SET_SESSION,
    CACHE_CLEAR_KEY
} from '../actions/types';
import { UserData, UserActionTypes, MaisVotado, SetSessionAction } from '../actions/userActions';
const CLEAR_CACHE_INTERVAL = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

const storedLastCacheClear = localStorage.getItem(CACHE_CLEAR_KEY);
const lastCacheClear = storedLastCacheClear ? new Date(storedLastCacheClear) : null;


interface UserState {
    loading: boolean;
    userInfo: UserData | null;
    users: UserData[]; // Array para armazenar todos os usuários buscados
    error: string | null;
    isLoggedIn: boolean;
    mostVoted: MaisVotado[] | null; // Adicione mostVoted aqui
    listaVotos: string[];
    votoConcretizado: boolean;
    votoConfirmadoId: number | null; // Pode ser útil armazenar o ID do voto confirmado
    carregando: boolean;
    erro: string | null;
    lastCacheClear: Date | null,
}
const storedSession = localStorage.getItem('userInfo');

const initialState: UserState = {
    lastCacheClear: lastCacheClear || new Date(),
    loading: false,
    userInfo: storedSession ? JSON.parse(storedSession) : null,
    users: [],
    error: null,
    isLoggedIn: !!storedSession,
    mostVoted: null, // Adicione mostVoted ao initialState
    listaVotos: [],
    votoConcretizado: false,
    votoConfirmadoId: null,
    carregando: false,
    erro: null,

};

// Agora, use o tipo UserActionTypes para a ação
const userReducer = (
    state: UserState = initialState,
    action: UserActionTypes | SetSessionAction
): UserState => {
    switch (action.type) {
        case CONCRETIZAR_VOTO_INICIO:
            return {
                ...state,
                carregando: true,
                erro: null,
            };
        case CONCRETIZAR_VOTO:
            if (state.userInfo) {
                // Atualiza a quantidade de votos do usuário votante
                return {
                    ...state,
                    userInfo: {
                        ...state.userInfo,
                        votos: state.userInfo.votos - 1,
                    },
                };
            }
            // Retorna o estado sem alterações se não houver usuário logado
            return state;

        case CONCRETIZAR_VOTO_SUCESSO:
            const updatedUserInfo = state.userInfo
                ? {
                    ...state.userInfo,
                    votos: state.userInfo.votos - 1,
                }
                : null;

            // Atualiza o localStorage com as novas informações
            if (updatedUserInfo) {
                localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            }

            return {
                ...state,
                votoConcretizado: true,
                votoConfirmadoId: action.payload,
                carregando: false,
                erro: null,
                userInfo: updatedUserInfo,
            };


        case CONCRETIZAR_VOTO_FALHA:
            return {
                ...state,
                carregando: false,
                erro: action.payload,
            };

        case UPDATE_LISTA_VOTOS:
            return {
                ...state,
                listaVotos: action.payload,
            };
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            const now = new Date();
            if (!state.lastCacheClear || (now.getTime() - (state.lastCacheClear.getTime() || 0)) > CLEAR_CACHE_INTERVAL) {
                localStorage.clear(); // Limpa o cache
                localStorage.setItem(CACHE_CLEAR_KEY, now.toISOString()); // Atualiza o registro da última limpeza
            }
            return {
                ...state,
                loading: false,
                userInfo: action.payload,
                isLoggedIn: true,
            };


        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                userInfo: null,
                isLoggedIn: false,
            };
        case LOGOUT:
            localStorage.removeItem('userInfo'); // Remove as informações do usuário do localStorage
            return {
                ...state,
                userInfo: null,
                isLoggedIn: false,
            };
        case FETCH_USERS_REQUEST:
            return { ...state, loading: true };
        case FETCH_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };
        case FETCH_USERS_FAILURE:
            return { ...state, loading: false, error: action.error };
        case FETCH_MOST_VOTED_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case FETCH_MOST_VOTED_SUCCESS:
            return {
                ...state,
                loading: false,
                mostVoted: action.payload,
            };

        case FETCH_MOST_VOTED_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                mostVoted: null,
            };
        case SET_SESSION:
            
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            const nows = new Date();
            if (!state.lastCacheClear || (nows.getTime() - (state.lastCacheClear.getTime() || 0)) > CLEAR_CACHE_INTERVAL) {
                localStorage.clear(); // Limpa o cache
                localStorage.setItem(CACHE_CLEAR_KEY, nows.toISOString()); // Atualiza o registro da última limpeza
            }
            return {
                ...state,
                userInfo: action.payload,
                isLoggedIn: true,
            };


        default:
            return state;
    }
};

export default userReducer;
