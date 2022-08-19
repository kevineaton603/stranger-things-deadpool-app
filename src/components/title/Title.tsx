import { useMediaQuery, Typography, useTheme } from '@mui/material';

const Title: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Typography
      variant={isSmallScreen ? 'h4' : 'h2'}
      sx={{
        textTransform: 'uppercase',
        textAlign: 'center',
        mb: 3,
      }}
    >
      {'Stranger Things Deadpool'}
    </Typography>
  );
};

export default Title;
