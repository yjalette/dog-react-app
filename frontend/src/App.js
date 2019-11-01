import React, {useState} from 'react';
import './styles/App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Authentication from './components/auth/Authentication';
import ConfirmEmail from './components/auth/ConfirmEmail';
import Adoption_View from './components/adoption/Adoption_View';
import Nav from './components/nav/Nav';
import Booking from './components/booking/Booking';
import News from './components/news/News';
import Contact from './components/contact/Contact';
import Landing from './components/home/Landing';
import { AuthContext } from './contexts/AuthContext'
import './axios';

const routes = [
  {component: Landing, path: "/", role: ['authUser', 'notAuthUser']},
  {component: Authentication, path: "/authentication", role: ['authUser', 'notAuthUser']},
  {component: ConfirmEmail, path: "/email-confirmation", role: ['authUser', 'notAuthUser']},
  {component: Adoption_View, path: "/adoption", role: ['authUser', 'notAuthUser'] },
  {component: News, path: "/news", role: ['authUser', 'notAuthUser'] },
  {component: Booking, path: "/booking", role: ['authUser', 'notAuthUser'] },
  {component: Contact, path: "/contact", role: ['authUser', 'notAuthUser']}
]

function App() {
  const [auth, setAuth] = useState();

  return (
    <div className="App">
      <AuthContext.Provider value={{auth, setAuth}}>
        <Router>
          <Nav />
          <div className="showcase">
            <Switch>
               {routes.filter(route => auth || route.role.includes('notAuthUser')).map(route => <Route key={route.path} component={route.component} path={route.path} />)}
            </Switch>
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
