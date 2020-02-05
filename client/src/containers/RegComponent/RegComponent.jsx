import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, FormGroup, Label } from "reactstrap";
import { Link } from "react-router-dom";
import "./RegComponent.css";

let data = {
  email: "",
  password: ""
};

class RegComponent extends Component {
  state = {
    userData: {
      ...data
    },
    errors: {
      ...data
    },
    valid: false
  };

  validateInput = (name, value) => {
    const errors = { ...this.state.errors };
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passRegex = /^.{4,32}$/;
    if (name === "email") {
      errors.email = !value.match(emailRegex) ? "notValid" : "";
    } else if (name === "password") {
      errors.password = !value.match(passRegex) ? "notValid" : "";
    }
    return errors;
  };

  handleOnChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    const newErrors = this.validateInput(name, value);
    const newFormData = { ...this.state.userData, [name]: value };

    let validateF = Object.keys(newErrors).every(key => {
      return newErrors[key] !== "notValid" && newFormData[key];
    });

    this.setState({
      userData: newFormData,
      errors: newErrors,
      valid: validateF
    });
  };

  handleOnClickBtn = () => {
    this.props.onRegisterBtn(this.state);
    this.props.history.push("/login");
  };

  handleOnClickLogin = () => {
    this.props.onLoginBtn(this.state);
    this.props.history.push("/");
    console.log(this.props.history);
  };

  render() {
    let path = this.props.history.location.pathname;
    const btn =
      path === "/login" ? (
        <div>
          <Button
            color="primary"
            disabled={!this.state.valid}
            onClick={this.handleOnClickLogin}
          >
            Login
          </Button>
          <p>
            <Link to="/registration">Register</Link>
          </p>
        </div>
      ) : (
        <div>
          <Button
            color="primary"
            disabled={!this.state.valid}
            onClick={this.handleOnClickBtn}
          >
            Register
          </Button>
          <p>
            <Link to="/login">Login</Link>
          </p>
        </div>
      );

    let msg =
      this.props.message && path === "/login" ? <p>User not found!</p> : null;
    return (
      <div className="formComponent">
        {msg}
        <Form className="form">
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={this.state.email}
              name="email"
              onChange={this.handleOnChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              value={this.state.password}
              type="password"
              name="password"
              onChange={this.handleOnChange}
            />
          </FormGroup>
          {btn}
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    message: state.message
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRegisterBtn: user => dispatch({ type: "REGISTRATION", user }),
    onLoginBtn: user => dispatch({ type: "LOGIN", user })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegComponent);
