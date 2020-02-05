import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Books from "./containers/Books/Books.jsx";
import SideMenu from "./containers/SideMenu/SideMenu";
import BookDetails from "./components/BookDetails/BookDetails";
import RegComponent from "./containers/RegComponent/RegComponent";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

class App extends Component {
  state = {
    response: ""
  };

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }

  // callApi = async () => {
  //   const response = await fetch("/api/hello");
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  render() {
    return (
      <div className="App">
        <Route>
          <SideMenu />
          <Switch>
            <Redirect exact from="/" to="/book" />
            <PrivateRoute exact path="/book" component={Books} />
            <PrivateRoute path="/book/:id" component={BookDetails} />
            <Route path="/login" component={RegComponent} />
            <Route path="/registration" component={RegComponent} />
          </Switch>
        </Route>
      </div>
    );
  }
}

export default App;
