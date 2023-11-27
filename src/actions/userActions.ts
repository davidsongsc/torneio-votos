import { Dispatch, AnyAction, Action } from 'redux';
import * as types from './types';
import { RootState } from '../reducers';
import axios, { AxiosResponse } from 'axios';

export interface ListaCompletaUsers {
  listaVotos: string[];
}

export interface SetSessionAction {
  type: typeof types.SET_SESSION;
  payload: UserData;
}

export const setSession = (userData: UserData): SetSessionAction => ({
  type: types.SET_SESSION,
  payload: userData,
});

export interface ConfigInfo {
  ver: string;
  serial: string;
  valendo: boolean;
  unidade: string;
  prazoManutencao: string;
  webpage: string;
}
export interface UserData {
  id: number;
  matricula: number;
  nome: string;
  senha: string;
  votos: number;
  alcunha: string;
  imagem: string;
  votosEmitidos: number;
  votosRecebidos: number;
  vontade: [];
  datames: string;
  ano: string;
}

export interface MaisVotado {
  id: number;
  nome: string;
  matricula: number;
  votos: number;
  alcunha: string;
  imagem: string;
  votosRecebidos: number;
  votosEmitidos: number;
  votante: string[];
  listaVotos: string[];
  datames: string;
  ano: string;
}

export interface ListaVotos {
  id: number;
  idvotante_id: string;
  idvotado_id: string;
  datahora_registro: string;
}

export interface ContarVotosAction extends Action<typeof types.CONTAR_VOTOS> {
  payload: number;
}

interface LogoutAction {
  type: typeof types.LOGOUT;
}

interface UpdateListaVotosAction {
  type: typeof types.UPDATE_LISTA_VOTOS;
  payload: string[];
}

interface AlterarLoginRequestAction {
  type: typeof types.ALTER_LOGIN_REQUEST;
}

interface AlterarLoginSuccessAction {
  type: typeof types.ALTER_LOGIN_SUCCESS;
  payload: UserData;
}

interface AlterLoginFailureAction {
  type: typeof types.ALTER_LOGIN_FAILURE;
  error: string;
}

interface LoginRequestAction {
  type: typeof types.LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof types.LOGIN_SUCCESS;
  payload: UserData;
}

interface LoginFailureAction {
  type: typeof types.LOGIN_FAILURE;
  error: string;
}

interface FetchUsersRequestAction {
  type: typeof types.FETCH_USERS_REQUEST;
}

interface FetchUsersSuccessAction {
  type: typeof types.FETCH_USERS_SUCCESS;
  payload: UserData[];
}

interface FetchUsersFailureAction {
  type: typeof types.FETCH_USERS_FAILURE;
  error: string;
}

interface FetchMostVotedRequestAction {
  type: typeof types.FETCH_MOST_VOTED_REQUEST;
}

interface FetchMostVotedSuccessAction {
  type: typeof types.FETCH_MOST_VOTED_SUCCESS;
  payload: MaisVotado[];
}

export interface FetchListarVotos {
  type: typeof types.FETCH_LISTAR_VOTOS;
  payload: ListaVotos[];
}


interface FetchMostVotedFailureAction {
  type: typeof types.FETCH_MOST_VOTED_FAILURE;
  error: string;
}

export const contarVotos = (quantidade: number): AnyAction => ({
  type: types.CONTAR_VOTOS,
  payload: quantidade,
});

export const enviarVoto = (idVotante: any, idVotado: any) => {
  return {
    type: 'ENVIAR_VOTO',
    payload: { idVotante, idVotado },
  };
};

export const updateListaVotos = (contarVotos: string[]): UpdateListaVotosAction => ({
  type: types.UPDATE_LISTA_VOTOS,
  payload: contarVotos,
});

export const listarVotosContest = (listar: ListaVotos[]): FetchListarVotos => ({
  type: types.FETCH_LISTAR_VOTOS,
  payload: listar,
});

const fetchMostVotedRequest = (): FetchMostVotedRequestAction => ({
  type: types.FETCH_MOST_VOTED_REQUEST,
});

const fetchMostVotedSuccess = (mostVoted: MaisVotado[]): FetchMostVotedSuccessAction => ({
  type: types.FETCH_MOST_VOTED_SUCCESS,
  payload: mostVoted,
});

const fetchMostVotedFailure = (error: string): FetchMostVotedFailureAction => ({
  type: types.FETCH_MOST_VOTED_FAILURE,
  error,
});


const fetchUsersRequest = (): FetchUsersRequestAction => ({
  type: types.FETCH_USERS_REQUEST,
});

const fetchUsersSuccess = (users: UserData[]): FetchUsersSuccessAction => ({
  type: types.FETCH_USERS_SUCCESS,
  payload: users,
});

const fetchUsersFailure = (error: string): FetchUsersFailureAction => ({
  type: types.FETCH_USERS_FAILURE,
  error,
});

interface ConcretizarVotoAction {
  type: typeof types.CONCRETIZAR_VOTO;
  payload: {
    idVotado: number;
    idvotante: number;
  };
}

export const logoutUser = () => {
  return (dispatch: Dispatch) => {
    // Aqui você pode também limpar o armazenamento local ou a sessão se necessário
    // Por exemplo: localStorage.removeItem('userToken');

    // Dispare a ação de logout
    dispatch({ type: types.LOGOUT });
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
  | UpdateListaVotosAction
  | AlterLoginFailureAction
  | AlterarLoginRequestAction
  | AlterarLoginSuccessAction
  | ConcretizarVotoAction
  | SetSessionAction
  | FetchListarVotos
  | { type: typeof types.CONCRETIZAR_VOTO_INICIO }
  | { type: typeof types.CONCRETIZAR_VOTO_SUCESSO; payload: number }
  | { type: typeof types.CONCRETIZAR_VOTO_FALHA; payload: string }
  | { type: typeof types.CONCRETIZAR_VOTO; payload: number };;

export const fetchMostVoted = () => {
  return (dispatch: Dispatch<UserActionTypes>) => {
    dispatch(fetchMostVotedRequest());

    // Fazer a chamada à sua API para buscar os mais -dos
    fetch(types.API_VOTOS, {
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
        const contarVotos = mostVoted.map((item: MaisVotado) => item.id.toString());
        dispatch(updateListaVotos(contarVotos));
        dispatch(fetchMostVotedSuccess(mostVoted));
      })
      .catch(error => dispatch(fetchMostVotedFailure(error.message)));
  };
};


export const loginUser = (credentials: { matricula: string; senha: string }) => {
  return (dispatch: Dispatch<UserActionTypes>) => {
    dispatch({ type: types.LOGIN_REQUEST });

    return new Promise((resolve, reject) => {
      fetch(types.API_LOGIN, {
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
            response.json().then(json => reject(json.error));
            throw new Error('Credenciais inválidas');
          }
        })
        .then(userData => {
          dispatch({ type: types.LOGIN_SUCCESS, payload: userData });
          resolve(userData);
        })
        .catch(error => {
          dispatch({ type: types.LOGIN_FAILURE, error: error.toString() });
          reject(error);
        });
    });
  };
};

export const alteraLoginUser = (credentials: { matricula: string; senha: string; selectedDay: string; selectedMonth: string; }) => {
  return (dispatch: Dispatch<UserActionTypes>) => {
    dispatch({ type: types.ALTER_LOGIN_REQUEST });

    return new Promise((resolve, reject) => {
      fetch(types.API_ALTER_LOGIN, {
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
            response.json().then(json => reject(json.error));
            throw new Error('Credenciais inválidas');
          }
        })
        .then(userData => {
          dispatch({ type: types.ALTER_LOGIN_SUCCESS, payload: userData });
          resolve(userData);
        })
        .catch(error => {
          dispatch({ type: types.ALTER_LOGIN_FAILURE, error: error.toString() });
          reject(error);
        });
    });
  };
};

export const fetchUsers = () => {
  return (dispatch: Dispatch<UserActionTypes>) => {
    dispatch(fetchUsersRequest());
    fetch(types.API_VOTOS, {
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


export const fetchUsersAndUpdate = async (dispatch: Dispatch<UserActionTypes>) => {
  try {
    const response: AxiosResponse<UserData[]> = await axios.post<UserData[]>(types.API_USUARIOS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Verifica se a resposta tem o status de sucesso
    if (response.status !== 200) {
      throw new Error('Falha ao buscar usuários');
    }

    // Extrai os dados da resposta
    const users = response.data;

    dispatch(fetchUsersSuccess(users));
  } catch (error: any) {
    if (error instanceof Error) {
      dispatch(fetchUsersFailure(error.message));
    } else {
      // Se o erro não for uma instância de Error, trate conforme necessário
      dispatch(fetchUsersFailure('Erro ao buscar usuários'));
    }
  }
};

export const concretizarVotoAsync = (idVotado: number) => {
  return async (dispatch: Dispatch<ConcretizarVotoAction>, getState: () => RootState) => {
    try {
      const usuarioLogado = getState().userReducer.userInfo?.matricula;

      if (!usuarioLogado) {
        throw new Error('Usuário não autenticado'); // Ou trate de outra forma conforme necessário
      }

      const response = await axios.post(types.API_ENVIAR_VOTOS, { id_votado: idVotado, id_votante: usuarioLogado });
      console.log(usuarioLogado);

      // Atualiza a lista de usuários após o voto ser concretizado
      fetchUsersAndUpdate(dispatch);

      dispatch({
        type: types.CONCRETIZAR_VOTO,
        payload: {
          idVotado: idVotado,
          idvotante: usuarioLogado,
        },
      });

      console.log('Confirmação do voto enviada com sucesso para a API', response.data);
    } catch (error) {
      console.error('Erro ao enviar a confirmação do voto para a API:', error);
      // Trate o erro conforme necessário
    }
  };
};

export const fetchListarVotos = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      // Realize a chamada à API aqui (usando axios, fetch, etc.)
      const response = await fetch(types.API_LISTA_VOTOS );
      const data = await response.json();

      // Despache a ação com os dados recebidos
      dispatch({
        type: types.FETCH_LISTAR_VOTOS,
        payload: data,
      });
    } catch (error) {
      // Lidere os erros conforme necessário
      console.error('Erro ao buscar dados da API:', error);
    }
  };
};