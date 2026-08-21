import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Main';
import reportWebVitals from './reportWebVitals';
import { initThemeMode } from './lib/themeMode';
import i18n from './i18n';
import { langFromPathname } from './lib/langRouting';

initThemeMode();

// Set the language from the URL before the first render so the initial
// paint (what crawlers and users both see) is never wrong for a beat.
i18n.changeLanguage(langFromPathname(window.location.pathname));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
