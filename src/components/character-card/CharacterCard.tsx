/* eslint-disable react/prop-types */
import {
  Avatar, Stack, Typography,
} from '@mui/material';
import { CharacterType } from '../../models/character';
import NeonPaper from '../neon-paper/NeonPaper';

type CharacterCardProps = {
  character: CharacterType
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => (
  <NeonPaper
    borderVariant={'secondary'}
    sx={{
      p: 2,
      m: 1,
    }}
  >
    <Stack
      textAlign={'center'}
      alignItems={'center'}
    >
      <Avatar
        src={character.uri}
        sx={{
          height: 150,
          width: 150,
        }}
      />
      <Typography variant={'h6'}>
        {character.name}
      </Typography>
    </Stack>
  </NeonPaper>
);

export default CharacterCard;
