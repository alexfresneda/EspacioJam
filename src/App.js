import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Cine from "./components/pages/Cine";
import Nba from "./components/pages/Nba";
import Article from "./components/pages/Article";
import Episode from "./components/pages/Episode";
import NotFound from "./components/pages/ErrorPage";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cine" exact component={Cine} />
          <Route path="/baloncesto" exact component={Nba} />
          <Route path="/:topic/articulo/:sysId" exact component={Article} />
          <Route path="/:topic/episodio/:sysId" exact component={Episode} />
          <Route path="" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
