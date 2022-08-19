/* eslint-disable max-len */
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NeonPaper from '../neon-paper/NeonPaper';

const RulesPaper: React.FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/select');
  };
  return (
    <NeonPaper
      sx={{
        p: 2,
      }}
    >
      <Typography variant={'h5'}>Rules:</Typography>
      <Typography variant={'h6'}>How To Enter:</Typography>
      <ul>
        <li><Typography>Create your Deadpool list which is a list of the following characters who you think are most likely to die</Typography></li>
        <li><Typography>$10 Entry Fee(Pay upon arrival of Viewing Party or Venmo me @kevineaton603)</Typography></li>
        <li><Typography>Lists must be complete before the new episodes are realeased on JULY 1ST and entry fees must be paid before JULY 1ST or at the veiwing party if you are attending.</Typography></li>
      </ul>
      <Typography variant={'h6'}>Winning / Payouts:</Typography>
      <div>For each character death, the total pot will be divided that many times. For example, if the total pot is $100 and one character dies, then the character pots will be $100. If two characters dies, then the character pots will be $50 each. Three characters dies, $33.33 etc.</div>
      <div>Those character pots will be awarded to the participant(s) who placed that character highest on their deadpool. If two or more participants have a character at the same rank, they will split the pot equally.</div>
      <Button
        variant={'contained'}
        onClick={onClick}
        fullWidth={true}
        sx={{
          mt: 4,
        }}
      >
        Create Your Deadpool List Here!
      </Button>
    </NeonPaper>
  );
};

export default RulesPaper;
