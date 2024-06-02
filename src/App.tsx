import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/Routes/AppRoutes';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

import './style.module.css'
import { Notifications } from '@mantine/notifications';
export default function App() {
  return (
    <MantineProvider theme={theme} >
      <Notifications zIndex={100000000} />
      {/* <Router /> */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </MantineProvider>
  );
}
