import { VOTAR, SET_SEARCH } from './types';

export const votar = (id: number) => {
  return { type: VOTAR, payload: id };
};

export const setSearch = (term: string) => {
  return { type: SET_SEARCH, payload: term };
};

