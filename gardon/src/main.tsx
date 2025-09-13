import './index.css'
import './styles/globals.scss';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider
      theme={{
        colors: {
          brand: ['#e6f4ef', '#cce9df', '#99d3bf', '#66bd9f', '#33a77f', '#00915f', '#00734c', '#005539', '#003726', '#001913'],
        },
        primaryColor: 'brand',
        defaultRadius: 'md',
      }}>
      <Notifications />
      <App />
    </MantineProvider>
  </StrictMode>,
)
