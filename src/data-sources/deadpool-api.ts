import { CharacterStatusType } from '../models/character-status/CharacterStatusModel';
import { DeadpoolType } from '../models/deadpool/Deadpool';
import { FormModel } from '../screens/selection/models/FormModel';

export const DeadpoolQueryName = 'Deadpool';

const baseUrl = import.meta.env.VITE_DEADPOOL_API_URI; // 'https://deadpool-api.kevineaton.me';

export const postDeadpoolAsync = async (model: FormModel): Promise<DeadpoolType> => {
  const response = await fetch(`${baseUrl}/deadpool`, {
    method: 'POST',
    body: JSON.stringify(model),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseModel = await response.json() as DeadpoolType;

  return responseModel;
};

export const getAllDeadpoolAsync = async () => {
  const response = await fetch(`${baseUrl}/deadpool`, {
    method: 'GET',
  });

  return await response.json() as Array<DeadpoolType>;
};

export const CharacterStatusQueryName = 'CharacterStatus';

export const getAllCharacterAsync = async () => {
  const response = await fetch(`${baseUrl}/character`, {
    method: 'GET',
  });

  return await response.json() as Array<CharacterStatusType>;
};

export const putCharacterStatusAsync = async (status: 'dead' | 'alive', models: { id: string }[]) => {
  const response = await fetch(`${baseUrl}/character/${status}`, {
    method: 'PUT',
    body: JSON.stringify({ characters: models }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json() as Array<CharacterStatusType>;
};
