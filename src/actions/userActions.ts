import { Dispatch } from 'redux';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const FETCH_MOST_VOTED_REQUEST = 'FETCH_MOST_VOTED_REQUEST';
export const FETCH_MOST_VOTED_SUCCESS = 'FETCH_MOST_VOTED_SUCCESS';
export const FETCH_MOST_VOTED_FAILURE = 'FETCH_MOST_VOTED_FAILURE';
export const UPDATE_LISTA_VOTOS = 'UPDATE_LISTA_VOTOS';

export interface ListaCompletaUsers {
  listaVotos: string[];
}

export interface UserData {
  id: number;
  matricula: number;
  nome: string;
  senha: string;
  votos: number;
  alcunha: string;
  imagem: string;
  votosEmitidos: [];
  votosRecebidos: [];
  vontade: [];

}

export interface MaisVotado {
  id: number;
  nome: string;
  matricula: number;
  votos: number;
  votosRecebidos: number;
  votosEmitidos: number;
  votante: string[];
  listaVotos: string[];
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface UpdateListaVotosAction {
  type: typeof UPDATE_LISTA_VOTOS;
  payload: string[];
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

interface FetchMostVotedRequestAction {
  type: typeof FETCH_MOST_VOTED_REQUEST;
}

interface FetchMostVotedSuccessAction {
  type: typeof FETCH_MOST_VOTED_SUCCESS;
  payload: MaisVotado[]; // Use a nova interface MaisVotado aqui
}

interface FetchMostVotedFailureAction {
  type: typeof FETCH_MOST_VOTED_FAILURE;
  error: string;
}

export const updateListaVotos = (contarVotos: string[]): UpdateListaVotosAction => ({
  type: UPDATE_LISTA_VOTOS,
  payload: contarVotos,
});

const fetchMostVotedRequest = (): FetchMostVotedRequestAction => ({
  type: FETCH_MOST_VOTED_REQUEST,
});

const fetchMostVotedSuccess = (mostVoted: MaisVotado[]): FetchMostVotedSuccessAction => ({
  type: FETCH_MOST_VOTED_SUCCESS,
  payload: mostVoted,
});

const fetchMostVotedFailure = (error: string): FetchMostVotedFailureAction => ({
  type: FETCH_MOST_VOTED_FAILURE,
  error,
});


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
  | FetchUsersFailureAction
  | FetchMostVotedRequestAction
  | FetchMostVotedSuccessAction
  | FetchMostVotedFailureAction
  | UpdateListaVotosAction;


export const fetchUsers = () => {
  return (dispatch: Dispatch<UserActionTypes>) => {
    dispatch(fetchUsersRequest());
    fetch('http://192.168.0.50:5000/usuarios/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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

export const fetchMostVoted = () => {
  return (dispatch: Dispatch<UserActionTypes>) => {
    dispatch(fetchMostVotedRequest());

    // Fazer a chamada à sua API para buscar os mais votados
    fetch('http://192.168.0.50:5000/contar-votos/', {
      method: 'GET', // Use o método GET para buscar dados
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao buscar os mais votados');
        }
        return response.json();
      })
      .then(mostVoted => {
        console.log(mostVoted)
        const contarVotos = mostVoted.map((item: MaisVotado) => item.id.toString());
        dispatch(updateListaVotos(contarVotos));
        dispatch(fetchMostVotedSuccess(mostVoted));
      })
      .catch(error => dispatch(fetchMostVotedFailure(error.message)));
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