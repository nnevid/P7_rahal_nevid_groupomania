import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, } from "react-router-dom";
import Home from "../../pages/Home";
import Posts from "../../pages/Posts";
import Profil from "../../pages/Profil";
const index = () => {
  return (
    <div>
      <Router>
        <Switch>
        <Route path="/" exact component={Home} />
          <Route path="/posts" exact component={Posts} />
          <Route path="/profil" exact component={Profil} />
          <Redirect to='/' />
        </Switch>
      </Router>
    </div>
  );
};

export default index;


