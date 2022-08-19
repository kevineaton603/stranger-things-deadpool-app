import { CreateMethod } from '..';

export type CharacterStatusType = {
  id: string;
  name: string;
  status: 'alive' | 'dead';
};

const create: CreateMethod<CharacterStatusType> = (args) => ({
  id: args?.id ?? '',
  name: args?.name ?? '',
  status: args?.status ?? 'alive',
});

const CharacterStatus = {
  create,
};

export default CharacterStatus;
