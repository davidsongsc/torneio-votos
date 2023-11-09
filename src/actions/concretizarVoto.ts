export const CONCRETIZAR_VOTO = 'CONCRETIZAR_VOTO';

export const concretizarVoto = (voto: number) => {
  return {
    type: CONCRETIZAR_VOTO,
    payload: voto,
  };
};
