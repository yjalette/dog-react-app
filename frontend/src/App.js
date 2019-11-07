import React, {useState, useContext, useEffect} from 'react';
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
import Grooming from './components/grooming/Grooming';
import Footer from './components/footer/Footer';

// const routes = [
//   {component: Landing, path: "/", role: ['authUser', 'notAuthUser']},
//   {component: Authentication, path: "/authentication", role: ['authUser', 'notAuthUser']},
//   {component: ConfirmEmail, path: "/email-confirmation", role: ['authUser', 'notAuthUser']},
//   {component: Adoption_View, path: "/adoption", role: ['authUser', 'notAuthUser'] },
//   {component: News, path: "/news", role: ['authUser', 'notAuthUser'] },
//   {component: Booking, path: "/booking", role: ['authUser', 'notAuthUser'] },
//   {component: Contact, path: "/contact", role: ['authUser', 'notAuthUser']}
// ]

function withAuth(Component) {
  return function(props) {
    const { auth } = useContext(AuthContext);
    if (!auth) {
      return <Authentication msg="please login to view this page"/>
    }
    return <Component {...props} />;
  }
}

const AuthBooking = withAuth(Booking);

function App() {
  const [auth, setAuth] = useState(() => {
    const ls = sessionStorage.getItem('user');
    try {
      return JSON.parse(ls);
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(auth));
  }, [auth]);

  return (
    <div className="App">
      <AuthContext.Provider value={{auth, setAuth}}>
        <Router>
          <Nav />
          <div className="showcase">
            <Switch>
              <Route key='landing' component={Landing} exact path="/" />
              <Route key='authentication' component={Authentication} path='/authentication' />
              <Route key='grooming' component={Grooming} path="/grooming" />
              <Route key='booking' component={AuthBooking} path='/booking'/>
              <Route key='news' component={News} path='/news'/>
              <Route key='adoption' component={Adoption_View} path='/adoption' />
              <Route key='confirmEmail' component={ConfirmEmail} path='/confirm-email' />
              <Route key='contact' component={Contact} path='/contact' />
            </Switch>
          </div>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
