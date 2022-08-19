import { CreateMethod } from '../../../utils';

export type CharacterStatsType = {
  high: number,
  low: number,
  average: number,
  count: number,
  name: string,
};

const create: CreateMethod<CharacterStatsType> = (args) => ({
  average: args?.average ?? 0,
  count: args?.count ?? 0,
  high: args?.high ?? 21,
  low: args?.low ?? 0,
  name: args?.name ?? '',
});

const CharacterStats = {
  create,
};

export default CharacterStats;
