// actions/concretizarVoto.ts

// Defina uma constante para representar o tipo da ação
export const CONCRETIZAR_VOTO = 'CONCRETIZAR_VOTO';

// Defina uma função de ação que criará a ação de concretizar voto
export const concretizarVoto = (voto: number) => {
  return {
    type: CONCRETIZAR_VOTO,
    payload: voto,
  };
};
