import {
  Container,
  Stack,
  Grid,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import CharacterCard from '../../components/character-card/CharacterCard';
import CountdownPaper from '../../components/countdown-paper';
import NeonPaper from '../../components/neon-paper/NeonPaper';
import RulesPaper from '../../components/rules-paper/RulesPaper';
import Title from '../../components/title/Title';
import characters from '../../data-sources/characters';
import { DeadpoolQueryName, getAllDeadpoolAsync } from '../../data-sources/deadpool-api';
import { VenmoLink } from '../pay/PayScreen';
import { WinnerScreenPath } from '../winner/WinnerScreen';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useQuery(DeadpoolQueryName, getAllDeadpoolAsync, { retry: 0 });

  const playerCount = useMemo(() => data?.length ?? 0, [data?.length]);
  // eslint-disable-next-line max-len
  const paidPlayers = useMemo(() => data?.reduce((acc, x) => (x.paid ? acc + 1 : acc), 0) ?? 0, [data]);

  return (
    <Container
      sx={{ p: 2 }}
    >
      <Stack
        alignItems={'center'}
        spacing={3}
      >
        <Title />
        <CountdownPaper />
        <RulesPaper />
        <Grid
          container={true}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          textAlign={'center'}
          sx={{ py: 4 }}
          columns={24}
        >
          <Grid
            item={true}
            md={8}
            xs={7}
          >
            {!isLoading ? <Typography variant={'h2'}>{playerCount}</Typography> : <CircularProgress />}
            <Typography variant={'subtitle1'}>Entrees</Typography>
          </Grid>
          <Grid
            item={true}
            md={8}
            xs={7}
          >
            {!isLoading ? <Typography variant={'h2'}>{paidPlayers}</Typography> : <CircularProgress />}
            <Typography variant={'subtitle1'}>Paid</Typography>
          </Grid>
          <Grid
            item={true}
            md={8}
            xs={10}
          >
            {!isLoading ? <Typography variant={'h2'}>{`$${paidPlayers * 10}`}</Typography> : <CircularProgress />}
            <Typography variant={'subtitle1'}>Prize Pool</Typography>
          </Grid>
        </Grid>
        <Stack
          direction={{
            sm: 'column',
            md: 'row',
          }}
          spacing={3}
        >
          <NeonPaper
            sx={{
              p: 2,
              width: '100%',
            }}
          >
            <Stack
              direction={'column'}
              justifyContent={'space-between'}
              height={'100%'}
            >
              <Typography variant={'body1'}>{'Already have a deadpool but haven\'t paid yet?'}</Typography>
              <Button
                onClick={() => {
                  window.location.replace(VenmoLink);
                }}
                variant={'contained'}
                fullWidth={true}
                sx={{ my: 2 }}
              >
                Go to Venmo
              </Button>

            </Stack>
          </NeonPaper>
          <NeonPaper
            sx={{
              p: 2,
              width: '100%',
            }}
          >
            <Stack
              direction={'column'}
              justifyContent={'space-between'}
              height={'100%'}
            >
              <Typography variant={'body1'}>{'Checkout the winners here!'}</Typography>
              <Button
                onClick={() => {
                  navigate(WinnerScreenPath);
                }}
                variant={'contained'}
                fullWidth={true}
                sx={{
                  my: 2,
                  width: '100%',
                }}
              >
                See Winners!
              </Button>
            </Stack>

          </NeonPaper>
        </Stack>

        <Grid
          container={true}
          direction={'row'}
        >
          {characters.map((character) => (
            <Grid
              item={true}
              md={3}
              sm={6}
              xs={12}
            >
              <CharacterCard
                character={character}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};

export default HomeScreen;
