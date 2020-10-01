import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import DetailPage from './pages/DetailPage';
import UpdatePage from './pages/UpdatePage';
import Home from './pages/Home';

function App() {
  return (
    <div className="app container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/restaurants/:id" component={UpdatePage} />
        <Route exact path="/restaurants/:id/detail" component={DetailPage} />
      </Switch>
    </div>
  );
}

export default App;
