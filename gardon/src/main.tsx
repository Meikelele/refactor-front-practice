import './index.css'
import './styles/globals.scss';
import "primereact/resources/themes/lara-light-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { PrimeReactProvider } from "primereact/api";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
<StrictMode>
  <PrimeReactProvider value={{ ripple: true }}>
    <App />
  </PrimeReactProvider>
</StrictMode>,
)








