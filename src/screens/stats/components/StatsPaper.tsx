import {
  Avatar, CircularProgress, Grid, Stack, Typography,
} from '@mui/material';
import NeonPaper from '../../../components/neon-paper/NeonPaper';
import { CharacterType } from '../../../models/character';
import { CharacterStatsType } from '../models/CharacterStats';

type StatsPaperProps = {
  character: CharacterType;
  stats: CharacterStatsType;
  isLoading: boolean;
};

const StatsPaper: React.FC<StatsPaperProps> = ({ character, stats, isLoading }) => (
  <NeonPaper
    borderVariant={'primary'}
    sx={{ p: 1 }}
  >
    <Grid
      container={true}
      direction={'row'}
      columns={16}
      textAlign={'center'}
    >
      <Grid
        item={true}
        xs={4}
      >
        <Stack
          textAlign={'center'}
          alignItems={'center'}
        >
          <Avatar
            src={character.uri}
            sx={{
              height: 75,
              width: 75,
            }}
          />
          <Typography
            variant={'caption'}
            sx={{ textAlign: 'center' }}
          >
            {character.name}
          </Typography>
        </Stack>

      </Grid>
      <Grid
        item={true}
        xs={4}
      >
        {!isLoading ? <Typography variant={'h3'}>{stats.high}</Typography> : <CircularProgress />}
        <Typography variant={'caption'}>Highest</Typography>
      </Grid>
      <Grid
        item={true}
        xs={4}
      >
        {!isLoading ? <Typography variant={'h3'}>{stats.low}</Typography> : <CircularProgress />}
        <Typography variant={'caption'}>Lowest</Typography>
      </Grid>
      <Grid
        item={true}
        xs={4}
      >
        {!isLoading ? <Typography variant={'h3'}>{Math.round(stats.average)}</Typography> : <CircularProgress />}
        <Typography variant={'caption'}>Average</Typography>
      </Grid>
    </Grid>
  </NeonPaper>
);

export default StatsPaper;
