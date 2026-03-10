import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './ui/App';
import { getStoredTheme, applyTheme } from '@/core/services/theme-manager';
import './assets/styles/styles.css';

applyTheme(getStoredTheme());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);