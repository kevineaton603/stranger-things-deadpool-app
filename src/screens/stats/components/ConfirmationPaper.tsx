import {
  Alert, AlertTitle, Button, Stack, TextField,
} from '@mui/material';
import { useState } from 'react';
import NeonPaper from '../../../components/neon-paper/NeonPaper';

type ConfirmationPaperProps = {
  emails: string[];
  onSubmit: () => void;
};

const ConfirmationPaper: React.FC<ConfirmationPaperProps> = ({ emails, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onClick = () => {
    if (emails.find((e) => e === email)) {
      localStorage.setItem('email', email);
      onSubmit();
    } else {
      setError('Invalid Email');
    }
  };

  return (
    <NeonPaper
      sx={{
        p: 1,
        m: 4,
      }}
    >
      <Stack
        spacing={2}
      >
        <Alert severity={'error'}>
          <AlertTitle>Error: Email not detected</AlertTitle>
          Enter the email you use to sign up to continue
        </Alert>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(error)}
          fullWidth={true}
          label={'Email'}
        />
        <Button
          variant={'contained'}
          onClick={onClick}
          fullWidth={true}
        >
          Submit Email
        </Button>
      </Stack>
    </NeonPaper>
  );
};

export default ConfirmationPaper;
