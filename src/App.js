import React, { useState } from "react";

import store from "./redux/createStore";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import ReduxToastr from "react-redux-toastr";
import { Provider } from "react-redux";
import IdleTimer from "react-idle-timer";

import ScanPage from "./pages/scan";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import Main from "./pages/main";
import Search from "./pages/search";
import HomePage from "./pages/home";
import Settings from "./pages/settings";
import "./App.css";

const history = createBrowserHistory();

function App() {
  const [timeOut, handleTimeOut] = useState(1000 * 60 * 1);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [userIsIdle, setUserIsIdle] = useState(false);
  const onAction = (e) => {
    console.log("user did something", e);
    setIsTimeOut(false);
    setUserIsIdle(false);
  };

  let idleTimer = null;
  const onActive = (e) => {
    console.log("user is active", e);
    setIsTimeOut(false);
    setUserIsIdle(false);
  };

  const onIdle = (e) => {
    console.log("user is idle", e);
    const isTimedOut = isTimeOut;
    if (isTimedOut) {
      setUserIsIdle(true);
    } else {
      idleTimer.reset();
      setIsTimeOut(true);
    }
  };
  return (
    <Provider store={store}>
      <div className="container" />
      <IdleTimer
        ref={(ref) => {
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
              render={(props) => <Main {...props} userIsIdle={userIsIdle} />}
            />
            <Route
              path="/scan"
              render={(props) => (
                <ScanPage
                  {...props}
                  userIsIdle={userIsIdle}
                  setIsTimeOut={setIsTimeOut}
                />
              )}
            />
            <Route
              path="/settings"
              render={(props) => (
                <Settings {...props} userIsIdle={userIsIdle} />
              )}
            />
            <Route
              path="/search"
              render={(props) => <Search {...props} userIsIdle={userIsIdle} />}
            />
            <Route path="/" render={(props) => <HomePage {...props} />} />
          </Switch>
        </BrowserRouter>
      </div>
      <ReduxToastr
        timeOut={4000}
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
