import React, { useState, useEffect } from 'react';
import './styles/App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import Authentication from './components/auth/Authentication';
import ConfirmEmail from './components/auth/ConfirmEmail';
import Adoption_View from './components/adoption/Adoption_View';
import Nav from './components/nav/Nav';
import Booking from './components/booking/Booking';
import News from './components/news/News';
import Contact from './components/contact/Contact';
import Landing from './components/home/Landing';
import { AuthContext } from './contexts/AuthContext';
import { MsgContext } from './contexts/MsgContext';
import './axios';
import Grooming from './components/grooming/Grooming';
import Footer from './components/footer/Footer';
import PwdReset from './components/auth/PwdReset';
import EnterNewCred from './components/auth/EnterNewCred';
import Details from './components/grid/Details';
import UpdateInputs from './components/account/UpdateInputs';


function App() {
  const [msg, setMsg] = useState({
    type: {
      error: "",
      success: ""
    }
  });

  const [auth, setAuth] = useState(() => {
    const ls = Cookies.get('user');
    console.log("ls==>", ls)
    try {
      return JSON.parse(ls);
    } catch (e) {
      return {};
    }
  });


  useEffect(() => {
    Cookies.set('user', JSON.stringify(auth))
  }, [auth]);

  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, setAuth }}>
        <MsgContext.Provider value={{ msg, setMsg }}>
          <Router>
            <Nav />
            <Route key='landing' component={Landing} exact path="/" />
            <div className="showcase">
              <Switch>
                <Route key='authentication' component={Authentication} path='/authentication' />
                <Route key='grooming' component={Grooming} path="/grooming" />
                <Route key='booking' component={Booking} path='/booking' />
                <Route key='news' component={News} path='/news' />
                <Route key='adoption' component={Adoption_View} path='/adoption' />
                <Route component={Details} path='/adoption-details' />
                <Route key='confirmEmail' component={ConfirmEmail} path='/confirm-email' />
                <Route key='account' component={UpdateInputs} path='/account' />
                <Route component={PwdReset} path='/password-reset' />
                <Route component={EnterNewCred} path='/forgot-password' />
                <Route key='contact' component={Contact} path='/contact' />
              </Switch>
            </div>
            <Footer />
          </Router>
        </MsgContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
