import { ArrowBackIosNew } from '@mui/icons-material';
import {
  Container, IconButton, Stack, Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import Confetti from 'react-confetti';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/title/Title';
import characters from '../../data-sources/characters';
import {
  CharacterStatusQueryName,
  DeadpoolQueryName,
  getAllCharacterAsync,
  getAllDeadpoolAsync,
} from '../../data-sources/deadpool-api';
import useWindowSize from '../../hooks/useWindowSize';
import Character, { CharacterType } from '../../models/character';
import { CharacterStatusType } from '../../models/character-status/CharacterStatusModel';
import { DeadpoolType } from '../../models/deadpool/Deadpool';
import { createRecordFromArray } from '../../utils';
import ConfirmationPaper from '../stats/components/ConfirmationPaper';
import { createCharacterStats } from '../stats/StatsScreen';
import WinnerPaper from './components/WinnerPaper';

const getWinners = (deadpools: DeadpoolType[], characterStatuses: CharacterStatusType[]) => {
  const totalPot = deadpools.length * 10;
  const characterPot = totalPot / characterStatuses.length;
  const stats = createRecordFromArray(createCharacterStats(deadpools), (x) => x.name);
  const winners = characterStatuses.reduce((acc, characterStatus) => {
    const highDeadpools = deadpools.filter((x) => Boolean(
      // eslint-disable-next-line max-len
      x.characters.find((c) => c.name === characterStatus.name)?.rank === stats[characterStatus.name].high,
    ));
    return {
      ...acc,
      [characterStatus.name]: {
        // eslint-disable-next-line max-len
        character: characters.find((x) => x.id === characterStatus.id) ?? Character.create(characterStatus),
        deadpools: highDeadpools,
        winningsPerPlayer: (characterPot / highDeadpools.length).toFixed(2),
      },
    };
  }, {} as Record<string, {
    character: CharacterType,
    deadpools: DeadpoolType[],
    winningsPerPlayer: string;
  }>);
  return winners;
};

const WinnerScreen: React.FC = () => {
  const deadpoolState = useQuery(DeadpoolQueryName, getAllDeadpoolAsync, { retry: 0 });
  const charactersState = useQuery(CharacterStatusQueryName, getAllCharacterAsync, { retry: 0 });
  const { height, width } = useWindowSize();
  const navigate = useNavigate();

  const [email, setEmail] = useState(localStorage.getItem('email'));

  // eslint-disable-next-line max-len
  const paidDeadpools = useMemo(() => deadpoolState.data?.filter((x) => Boolean(x.paid)) ?? [], [deadpoolState.data]);

  const deadCharacters = useMemo(() => charactersState.data?.filter((x) => x.status === 'dead') ?? [], [charactersState.data]);

  const winners = getWinners(paidDeadpools, deadCharacters);

  // eslint-disable-next-line max-len
  const isWinner = useMemo(() => Boolean(Object.values(winners).flatMap((x) => x.deadpools).find((x) => x.email === email)), [email, winners]);

  return (
    <Container
      maxWidth={'md'}
      sx={{ p: 1 }}
    >
      <Stack
        spacing={3}
        textAlign={'center'}
      >
        <Title />
        <Stack
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          textAlign={'left'}
          sx={{ width: '100%' }}
        >
          <IconButton
            onClick={() => navigate(-1)}
          >
            <ArrowBackIosNew />
          </IconButton>
        </Stack>

        {email ? Object.values(winners).map((winner) => (
          <WinnerPaper
            key={winner.character.name}
            character={winner.character}
            deadpools={winner.deadpools}
            winningsPerPlayer={winner.winningsPerPlayer}
          />
        )) : (
          <ConfirmationPaper
            onSubmit={() => {
              setEmail(localStorage.getItem('email'));
            }}
            emails={deadpoolState.data?.map((x) => x.email) ?? []}
          />
        )}
        {/* eslint-disable-next-line max-len */}
        {Object.keys(winners).length === 0 ? <Typography>No Winners Yet! Check back later...</Typography> : null}
      </Stack>
      {isWinner ? (
        <Confetti
          width={width}
          height={height}
          recycle={false}
        />
      ) : null}
    </Container>
  );
};

export const WinnerScreenPath = 'winner';

export default WinnerScreen;
