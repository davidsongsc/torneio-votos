// userReducer.js
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
} from '../actions/userActions';
// Importe os tipos de ação definidos anteriormente
import { UserData, UserActionTypes } from '../actions/userActions';
import { LOGOUT } from '../actions/userActions';

// Adicione o tipo do estado também para consistência
interface UserState {
    loading: boolean;
    userInfo: UserData | null;
    users: UserData[]; // Array para armazenar todos os usuários buscados
    error: string | null;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    loading: false,
    userInfo: null,
    users: [],
    error: null,
    isLoggedIn: false,
};



// Agora, use o tipo UserActionTypes para a ação
const userReducer = (
    state: UserState = initialState,
    action: UserActionTypes
): UserState => {
    switch (action.type) {
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
        // ... outros casos
        default:
            return state;
    }
};

export default userReducer;
