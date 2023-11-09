type User = {
    id: number | string;
    nome: string;
};

type MaisVotado = {
    id: number | string;
    nome: string;
    votos: number;
};

export type { User, MaisVotado };
