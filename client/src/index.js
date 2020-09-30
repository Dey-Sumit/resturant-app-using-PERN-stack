import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import { RestaurantContextProvider } from './context/RestaurantContext';

ReactDOM.render(
  <React.StrictMode>
    <RestaurantContextProvider>
      <Router>
        <App />
      </Router>
    </RestaurantContextProvider>
  </React.StrictMode>

  ,
  document.getElementById('root')
);

