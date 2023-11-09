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
    CONCRETIZAR_VOTO

} from '../actions/types';
import { UserData, UserActionTypes, MaisVotado } from '../actions/userActions';


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
}

const initialState: UserState = {
    loading: false,
    userInfo: null,
    users: [],
    error: null,
    isLoggedIn: false,
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
    action: UserActionTypes
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
            console.log('Votou em ' + action.payload);
            return {
                ...state,
                votoConcretizado: true,
                votoConfirmadoId: action.payload,
                carregando: false,
                erro: null,
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
                // Armazene os mais votados no estado
                mostVoted: action.payload,
            };

        case FETCH_MOST_VOTED_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                mostVoted: null, // Defina como null ou [] (vazio) dependendo do que você preferir em caso de falha
            };
        // ... outros casos
        default:
            return state;
    }
};

export default userReducer;
