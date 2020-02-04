import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Books from "./containers/Books/Books.jsx";

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
        <Switch>
          <Route path="/" component={Books} />
        </Switch>
      </div>
    );
  }
}

export default App;
