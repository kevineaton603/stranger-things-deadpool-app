import { Avatar, Stack, Typography } from '@mui/material';
import NeonPaper from '../../../components/neon-paper/NeonPaper';
import { CharacterType } from '../../../models/character';
import { DeadpoolType } from '../../../models/deadpool/Deadpool';

type WinnerPaperProps = {
  character: CharacterType,
  deadpools: DeadpoolType[],
  winningsPerPlayer: string;
};

const WinnerPaper: React.FC<WinnerPaperProps> = ({ character, deadpools, winningsPerPlayer }) => (
  <NeonPaper
    borderVariant={'secondary'}
    sx={{ p: 1 }}
  >
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      textAlign={'center'}
      spacing={1}
    >
      <Avatar
        src={character.uri}
        sx={{
          height: 100,
          width: 100,
        }}
      />
      <Typography variant={'h5'}>{character.name}</Typography>
      {deadpools.map((deadpool) => (
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          sx={{
            width: '100%',
            px: 3,
          }}
        >
          <div>
            <Typography>{deadpool.name}</Typography>
          </div>
          <div>
            <Typography>{`$${winningsPerPlayer}`}</Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  </NeonPaper>
);

export default WinnerPaper;
