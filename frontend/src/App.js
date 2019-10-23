import React from 'react';
import './styles/App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Authentication from './components/auth/Authentication';
import Adoption_View from './components/adoption/Adoption_View';
import Nav from './components/nav/Nav';
import Booking from './components/booking/Booking';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <div className="showcase">
          <Switch>
            <Route component={Adoption_View} path="/adoption" />
            <Route component={Authentication} path="/authentication" />
            <Route component={Booking} path="/booking" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
