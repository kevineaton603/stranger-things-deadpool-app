import { Paper, PaperProps, styled } from '@mui/material';

const NeonPaper = styled(Paper)<PaperProps & { borderVariant?: 'primary' | 'secondary' }>(({ theme, borderVariant = 'primary' }) => ({
  border: `1px solid ${theme.palette[borderVariant].main}`,
  boxShadow: `0 0 .2rem #fff,
    0 0 .2rem #fff,
    0 0 2rem ${theme.palette[borderVariant].main},
    0 0 0.8rem ${theme.palette[borderVariant].main},
    0 0 2.8rem ${theme.palette[borderVariant].main},
    inset 0 0 1.3rem ${theme.palette[borderVariant].main}`,
}));

export default NeonPaper;
