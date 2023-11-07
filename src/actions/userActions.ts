// userActions.ts

import { Dispatch } from 'redux';

// Defina tipos de ação para autenticação do usuário
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Defina o tipo de dados do usuário
export interface UserData {
  id: number;
  email: string;
  // Outros campos de dados do usuário, se necessário
}

// Defina o tipo de ação para a solicitação de login
interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

// Defina o tipo de ação para o sucesso do login
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: UserData; // Informações do usuário logado
}

// Defina o tipo de ação para falha no login
interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: string; // Mensagem de erro
}

// Exporte os tipos de ações
export type UserActionTypes = LoginRequestAction | LoginSuccessAction | LoginFailureAction;

// Ação assíncrona para autenticar o usuário
export const loginUser = (credentials: { email: string; password: string }) => {
  return async (dispatch: Dispatch<UserActionTypes>) => {
    // Dispare a ação de solicitação de login
    dispatch({ type: LOGIN_REQUEST });

    try {
      // Simule uma solicitação ao servidor ou autenticação
      // Substitua esta parte pelo código real de autenticação

      // Exemplo: 
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const userData: UserData = await response.json();
        // Dispare a ação de sucesso de login com os dados do usuário
        dispatch({ type: LOGIN_SUCCESS, payload: userData });
      } else {
        // Em caso de falha, dispare a ação de falha no login com a mensagem de erro
        dispatch({ type: LOGIN_FAILURE, error: 'Credenciais inválidas' });
      }
    } catch (error) {
      // Trate os erros da solicitação, se necessário
      dispatch({ type: LOGIN_FAILURE, error: 'Erro ao fazer login' });
    }
  };
};
