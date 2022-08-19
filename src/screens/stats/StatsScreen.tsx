import { Container, Stack } from '@mui/material';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import Title from '../../components/title/Title';
import characters from '../../data-sources/characters';
import { DeadpoolQueryName, getAllDeadpoolAsync } from '../../data-sources/deadpool-api';
import { DeadpoolType } from '../../models/deadpool/Deadpool';
import { createRecordFromArray } from '../../utils';
import ConfirmationPaper from './components/ConfirmationPaper';
import StatsPaper from './components/StatsPaper';
import CharacterStats, { CharacterStatsType } from './models/CharacterStats';

const defaultCharacterStats = characters.reduce((acc, val) => ({
  ...acc,
  [val.name]: CharacterStats.create({ name: val.name }),
}), {} as Record<string, CharacterStatsType>);

export const createCharacterStats = (list: DeadpoolType[]) => {
  const charactersRank = list.flatMap((deadpool) => deadpool.characters);

  const rankDictionary = charactersRank.reduce((acc, character) => {
    const accCharacter = acc[character.name];
    return {
      ...acc,
      [character.name]: {
        ...accCharacter,
        high: Math.min(accCharacter.high, character.rank),
        low: Math.max(accCharacter.low, character.rank),
        // eslint-disable-next-line max-len
        average: (accCharacter.average * accCharacter.count + character.rank) / (accCharacter.count + 1),
        count: accCharacter.count + 1,
      },
    };
  }, defaultCharacterStats);

  return Object.values(rankDictionary).sort((a, b) => a.average - b.average);
};

const characterRecords = createRecordFromArray(characters, (c) => c.name);

const StatsScreen = () => {
  const { data, isLoading } = useQuery(DeadpoolQueryName, getAllDeadpoolAsync, { retry: 0 });
  const characterStats = useMemo(() => createCharacterStats(data ?? []), [data]);
  const [email, setEmail] = useState(localStorage.getItem('email'));

  return (
    <Container
      maxWidth={'md'}
      sx={{ p: 1 }}
    >
      <Title />
      <Stack
        spacing={2}
      >
        {email ? characterStats.map((stats) => (
          <StatsPaper
            key={stats.name}
            character={characterRecords[stats.name]}
            stats={stats}
            isLoading={isLoading}
          />
        )) : (
          <ConfirmationPaper
            onSubmit={() => {
              setEmail(localStorage.getItem('email'));
            }}
            emails={data?.map((x) => x.email) ?? []}
          />
        )}
      </Stack>
    </Container>
  );
};

export const StatsScreenPath = 'stats';

export default StatsScreen;
