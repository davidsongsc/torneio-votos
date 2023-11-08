import { Dispatch } from 'redux';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

interface LogoutAction {
  type: typeof LOGOUT;
}

export interface UserData {
  matricula: number;
  nome: string;
  senha: string;
  votos: number;
  alcunha: string;
  imagem: string;
}

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: UserData;
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: string; // Mensagem de erro
}

interface FetchUsersRequestAction {
  type: typeof FETCH_USERS_REQUEST;
}

interface FetchUsersSuccessAction {
  type: typeof FETCH_USERS_SUCCESS;
  payload: UserData[];
}

interface FetchUsersFailureAction {
  type: typeof FETCH_USERS_FAILURE;
  error: string;
}

const fetchUsersRequest = (): FetchUsersRequestAction => ({
  type: FETCH_USERS_REQUEST,
});

const fetchUsersSuccess = (users: UserData[]): FetchUsersSuccessAction => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

const fetchUsersFailure = (error: string): FetchUsersFailureAction => ({
  type: FETCH_USERS_FAILURE,
  error,
});
export const logoutUser = () => {
  return (dispatch: Dispatch) => {
    // Aqui você pode também limpar o armazenamento local ou a sessão se necessário
    // Por exemplo: localStorage.removeItem('userToken');

    // Dispare a ação de logout
    dispatch({ type: LOGOUT });
  };
};
// Exporte os tipos de ações
export type UserActionTypes = LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | FetchUsersRequestAction
  | FetchUsersSuccessAction
  | FetchUsersFailureAction;

export const fetchUsers = () => {
  return (dispatch: Dispatch<UserActionTypes>) => {
    dispatch(fetchUsersRequest());
    fetch('http://192.168.0.50:5000/usuarios/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Inclua cabeçalhos de autenticação se necessário
      },
      // Se precisar enviar um corpo na requisição, descomente a linha abaixo
      // body: JSON.stringify({}),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao buscar usuários');
        }
        return response.json();
      })
      .then(users => dispatch(fetchUsersSuccess(users)))
      .catch(error => dispatch(fetchUsersFailure(error.message)));
  };
};

export const loginUser = (credentials: { matricula: string; senha: string }) => {
  return (dispatch: Dispatch<UserActionTypes>) => {
    // Dispare a ação de solicitação de login
    dispatch({ type: LOGIN_REQUEST });

    // Retorne a promessa
    return new Promise((resolve, reject) => {
      fetch('http://192.168.0.50:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            // Se a resposta não for OK, rejeite a promessa
            response.json().then(json => reject(json.error));
            throw new Error('Credenciais inválidas');
          }
        })
        .then(userData => {
          // Dispare a ação de sucesso de login com os dados do usuário
          dispatch({ type: LOGIN_SUCCESS, payload: userData });
          resolve(userData);
        })
        .catch(error => {
          // Dispare a ação de falha no login com a mensagem de erro
          dispatch({ type: LOGIN_FAILURE, error: error.toString() });
          reject(error);
        });
    });
  };
};