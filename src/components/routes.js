import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Games from "../pages/Games";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Page404 from "../pages/Page404";
import Register from "../pages/Register";
import Sprint from "../pages/Sprint";
import Stat from "../pages/Statistics";
import Textbook from "../pages/Textbook";
import Dictionary from "../pages/Textbook/Components/Dictionary/Dictionary";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/' exact render={() => <Main />} />
        <Route path='/textbook' render={() => <Textbook />} />
        <Route path='/dictionary' render={() => <Dictionary />} />
        <Route path='/games' exact render={() => <Games />} />
        <Route path='/games/sprint' render={() => <Sprint />} />
        <Route path='/stat' render={() => <Stat />} />
        <Redirect to='/' />
        <Route render={() => <Page404 />} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path='/login' exact render={() => <Login />} />
      <Route path='/register' exact render={() => <Register />} />
      <Redirect to='/login' />
    </Switch>
  );
};
