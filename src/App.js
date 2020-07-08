import React, { useState, useEffect } from 'react';

import store from './redux/createStore';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';
import { Provider } from 'react-redux';
import IdleTimer from 'react-idle-timer';

import ScanPage from './pages/scan';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Main from './pages/main';
import Search from './pages/search';
import HomePage from './pages/home';
import AdminLogIn from './pages/login';
import Settings from './pages/settings';
import ConfirmPage from './pages/confirm';
import DisplaySettings from './pages/displaySettings';
import QuestionPage from './pages/questionnaire';

import { getSettingsData } from './redux/actions/settingsActions';
import { getSettingsInfo } from './clients/api';
import './App.css';

const history = createBrowserHistory();

function App() {
  const [timeOut, handleTimeOut] = useState();
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [userIsIdle, setUserIsIdle] = useState(false);
  const onAction = e => {
    // console.log("user did something", e);
    setIsTimeOut(false);
    setUserIsIdle(false);
  };

  let idleTimer = null;
  const onActive = e => {
    // console.log("user is active", e);
    setIsTimeOut(false);
    setUserIsIdle(false);
  };

  const onIdle = e => {
    // console.log("user is idle", e);
    const isTimedOut = isTimeOut;
    if (isTimedOut) {
      setUserIsIdle(true);
    } else {
      idleTimer.reset();
      setIsTimeOut(true);
    }
  };

  const formatSettingsData = () => {
    store.dispatch(getSettingsData());
    getSettingsInfo()
      .then(res => res.text())
      .then(result => JSON.parse(result))
      .then(result => {
        handleTimeOut(1000 * result.idleTime * 60);
      });
  };

  useEffect(() => {
    formatSettingsData();
  }, []);

  return (
    <Provider store={store}>
      <div className="container" />
      <IdleTimer
        ref={ref => {
          idleTimer = ref;
        }}
        element={document}
        onActive={onActive}
        onIdle={onIdle}
        onAction={onAction}
        debounce={250}
        timeout={timeOut}
      />
      <div className="App">
        <BrowserRouter history={history}>
          <Switch>
            <Route
              exact
              path="/main"
              render={props => <Main {...props} userIsIdle={userIsIdle} />}
            />
            <Route
              path="/scan"
              render={props => (
                <ScanPage {...props} userIsIdle={userIsIdle} setIsTimeOut={setIsTimeOut} />
              )}
            />
            <Route path="/search" render={props => <Search {...props} userIsIdle={userIsIdle} />} />
            <Route
              path="/confirm"
              render={props => <ConfirmPage {...props} userIsIdle={userIsIdle} />}
            />
            <Route
              path="/questionnaire"
              render={props => <QuestionPage {...props} userIsIdle={userIsIdle} />}
            />
            <Route
              path="/settings"
              render={props =>
                localStorage.allkiosk_token ? (
                  <Settings {...props} userIsIdle={userIsIdle} />
                ) : (
                  <AdminLogIn {...props} userIsIdle={userIsIdle} />
                )
              }
            />
            <Route
              path="/display_settings"
              render={props => <DisplaySettings {...props} userIsIdle={userIsIdle} />}
            />
            <Route path="/" render={props => <HomePage {...props} />} />
          </Switch>
        </BrowserRouter>
      </div>
      <ReduxToastr
        timeOut={5000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
    </Provider>
  );
}

export default App;
