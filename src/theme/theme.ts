import { createTheme } from '@mui/material';
import BenguiatBold from '../assets/fonts/BenguiatBold.ttf';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#1e0707',
      default: '#1e193c',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
    primary: {
      main: '#3a5fe5',
      dark: '#3a5fe5',
    },
    secondary: {
      main: '#ff1515',
      dark: '#ff1515',
    },
  },
  typography: {
    fontFamily: 'BenguiatBold, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
            @font-face {
              font-family: 'BenguiatBold';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('Raleway'), local('Raleway-Regular'), url(${BenguiatBold}) format('woff2');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
    },
  },
});

export default theme;
