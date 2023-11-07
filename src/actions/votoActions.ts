import { VOTAR } from './types';

// Ação para votar
export const votar = (voto: number) => {
  return {
    type: VOTAR,
    payload: voto,
  };
};
