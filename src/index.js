import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

const myColor = [
  '#e8f4ff',
  '#d5e2fb',
  '#acc3ef',
  '#80a1e3',
  '#5b85d9',
  '#4373d4',
  '#356ad2',
  '#2659bb',
  '#1d4fa9',
  '#094496'
];

const theme = createTheme({
  colors: {
    myColor,
  }
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>
);

reportWebVitals();
