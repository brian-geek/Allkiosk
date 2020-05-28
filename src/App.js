import React from "react";
import ScanPage from "./components/ScanPage.js";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import Main from "./pages/main";
import Search from "./pages/search";
import "./App.css";

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path="/main" component={Main} />
          <Route path="/scan" component={ScanPage} />
          <Route path="/search" component={Search} />
          <Redirect from="/" to="/main" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
