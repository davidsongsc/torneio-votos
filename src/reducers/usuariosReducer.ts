// usuariosReducer.ts
import { Action } from 'redux';

// Defina a estrutura de cada usuário
interface Person {
  id: number;
  name: string;
  alcunha: string;
  imagem: string;
  votes: number;
}

// Defina o tipo de estado para armazenar os usuários
interface UsuariosState {
  usuarios: Person[]; // Array de usuários
}

// Estado inicial
const initialState: UsuariosState = {
  usuarios: [
    // Coloque seus usuários aqui
    { id: 1, name: 'Belisazrio Borba', alcunha: 'presidente', imagem: 'perfil', votes: 15 },
    { id: 2, name: 'Cipliano Pinto', alcunha: '', imagem: 'perfil', votes: 10 },
    { id: 3, name: 'Maria Manoela', alcunha: '', imagem: 'perfil', votes: 5 },
    { id: 4, name: 'Lucia Cleides', alcunha: '', imagem: 'perfil', votes: 8 },
    { id: 5, name: 'Marta Rosa', alcunha: '', imagem: 'perfil', votes: 3 },
    { id: 6, name: 'Eliane Leonel', alcunha: '', imagem: 'perfil', votes: 10 },
    { id: 7, name: 'Bruna Carla', alcunha: '', imagem: 'perfil', votes: 5 },
    { id: 8, name: 'Mauricio de souza ', alcunha: '', imagem: 'perfil', votes: 8 },
    { id: 9, name: 'George Neto', alcunha: '', imagem: 'perfil', votes: 1 },
    // Adicione mais usuários conforme necessário
  ],
};

// Reducer para manipular o estado dos usuários
const usuariosReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    // Adicione casos para manipular ações relacionadas aos usuários, se necessário
    default:
      return state;
  }
};

export default usuariosReducer;
