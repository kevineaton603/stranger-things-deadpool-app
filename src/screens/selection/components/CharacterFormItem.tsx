import {
  Stack, Avatar, Typography,
} from '@mui/material';
import NeonPaper from '../../../components/neon-paper/NeonPaper';
import { CharacterType } from '../../../models/character';

type CharacterCardProps = {
  character: CharacterType;
  index: number;
};

const CharacterFormItem: React.FC<CharacterCardProps> = ({ character, index }) => (
  <NeonPaper
    sx={{
      p: 2,
      m: 2,
    }}
    borderVariant={'secondary'}
  >
    <Stack
      direction={'row'}
      textAlign={'center'}
      alignItems={'center'}
      spacing={3}
    >
      <Typography variant={'h4'}>{index + 1}</Typography>
      <Avatar
        src={character.uri}
        sx={{
          height: 50,
          width: 50,
        }}
      />
      <Typography variant={'body1'}>
        {character.name}
      </Typography>
    </Stack>
  </NeonPaper>
);

export default CharacterFormItem;
