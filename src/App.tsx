import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from './theme';
import HomeScreen from './screens/home/HomeScreen';
import SelectionScreen from './screens/selection/SelectionScreen';
import StatsScreen, { StatsScreenPath } from './screens/stats/StatsScreen';
import PayScreen, { PayScreenPath } from './screens/pay/PayScreen';
import WinnerScreen, { WinnerScreenPath } from './screens/winner/WinnerScreen';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            index={true}
            element={<HomeScreen />}
          />
          <Route
            path={'select'}
            element={<SelectionScreen />}
          />
          <Route
            path={StatsScreenPath}
            element={<StatsScreen />}
          />
          <Route
            path={PayScreenPath}
            element={<PayScreen />}
          />
          <Route
            path={WinnerScreenPath}
            element={<WinnerScreen />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
