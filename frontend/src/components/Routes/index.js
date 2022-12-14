import React from "react";
import { BrowserRouter, Redirect, Route, Switch, } from "react-router-dom";
import Home from "../../pages/Home";
import Posts from "../../pages/Posts";
import Profil from "../../pages/Profil";
import Navbar from "../Navbar";
const index = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
        <Switch>
        <Route path="/" exact component={Home} />
          <Route path="/posts" exact component={Posts} />
          <Route path="/profil" exact component={Profil} />
          <Redirect to='/' />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default index;


