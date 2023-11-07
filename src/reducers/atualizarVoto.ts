import { createAction } from '@reduxjs/toolkit';

export const atualizarVoto = createAction<number>('voto/atualizar');
