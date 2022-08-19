import {
  Alert, Button, Container, Stack, useMediaQuery, useTheme,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import VenmoImage from '../../assets/venmo.png';
import Title from '../../components/title/Title';

export const VenmoLink = 'https://venmo.com/code?user_id=2475884120375296229&created=1656278892';

const PayScreen: React.FC = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const submission = searchParams.get('submission');
  const onClick = () => {
    window.location.replace(VenmoLink);
  };
  const onCancel = () => {
    navigate('/');
  };
  return (
    <Container
      maxWidth={'md'}
    >
      <Title />
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
      >
        {submission ? (
          <Alert
            severity={'success'}
            sx={{ width: '100%' }}
          >
            Your Deadpool Was Successfully Submitted
          </Alert>
        ) : null}
        <img
          src={VenmoImage}
          alt={'Venmo'}
          height={isMd ? 400 : 200}
        />
        <Button
          onClick={onClick}
          variant={'contained'}
          fullWidth={true}
        >
          Go to Venmo
        </Button>
        <Button
          onClick={onCancel}
          variant={'outlined'}
          fullWidth={true}
        >
          Skip Payment
        </Button>
      </Stack>
    </Container>

  );
};

export const PayScreenPath = 'pay';

export default PayScreen;
