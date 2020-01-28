import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { LoginView, Home } from './views';

function App() {
  return (
    <section className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginView} />
        </Switch>
      </Router>
    </section>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
