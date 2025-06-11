// MUI
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

// react router don
import { BrowserRouter } from 'react-router-dom';

// app routes
import AppRoutes from './AppRoutes';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
