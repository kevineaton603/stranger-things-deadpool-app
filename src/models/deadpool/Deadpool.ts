import { CreateMethod } from '..';

export type DeadpoolType = {
  id: string;
  name: string;
  email: string;
  characters: {
    rank: number;
    name: string;
  }[];
  paid?: boolean;
};

const create: CreateMethod<DeadpoolType> = (args) => ({
  id: args?.id ?? '',
  name: args?.name ?? '',
  email: args?.email ?? '',
  characters: args?.characters ?? [],
  paid: args?.paid ?? false,
});

const Deadpool = {
  create,
};

export default Deadpool;
