import { CharacterType } from '../../../models/character';

export type FormModel = {
  name: string;
  email: string;
  characters: Array<CharacterType>;
};
