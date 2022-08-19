import { CreateMethod } from '..';

export type CharacterType = {
  id: string;
  name: string;
  uri: string;
  description: string;
};

const create: CreateMethod<CharacterType> = (args) => ({
  id: args?.id ?? '',
  name: args?.name ?? '',
  uri: args?.uri ?? '',
  description: args?.description ?? '',
});

const Character = {
  create,
};

export default Character;
