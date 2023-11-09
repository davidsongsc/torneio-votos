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
} from '../actions/userActions';
// Importe os tipos de ação definidos anteriormente
import { UserData, UserActionTypes, MaisVotado } from '../actions/userActions';
import { LOGOUT } from '../actions/userActions';

// Adicione o tipo do estado também para consistência
interface UserState {
    loading: boolean;
    userInfo: UserData | null;
    users: UserData[]; // Array para armazenar todos os usuários buscados
    error: string | null;
    isLoggedIn: boolean;
    mostVoted: MaisVotado[] | null; // Adicione mostVoted aqui
    listaVotos: string[];
}

const initialState: UserState = {
    loading: false,
    userInfo: null,
    users: [],
    error: null,
    isLoggedIn: false,
    mostVoted: null, // Adicione mostVoted ao initialState
    listaVotos: [],

};

// Agora, use o tipo UserActionTypes para a ação
const userReducer = (
    state: UserState = initialState,
    action: UserActionTypes
): UserState => {
    switch (action.type) {
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
