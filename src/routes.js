import React from "react"
import { Route, Router } from "react-router-dom"

import App from "./App"
import LandingPage from "./pages/LandingPage/LandingPage"
import { history } from "./store"

export const Routes = () => (
  <Router history={history}>
    <Route path="/" exact component={LandingPage} />
  </Router>
)
