import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import * as serviceWorker from './serviceWorker';

const themeDark = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#311b92",
    },
  }
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={themeDark}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
