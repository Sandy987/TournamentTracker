import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import validateLogin from '../validateLogin';
import { initiateLogin } from '../actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router';
import css from './styles.css';

class LoginFormComponent extends Component {
  constructor() {
    super();
    this.state = {
      input: {
        email: '',
        password: '',
        rememberMe: false,
      },
      errors: {
        email: '',
        password: '',
      },
    };
    this.submit = this.submit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    const { input } = this.state;
    input[field] = value;

    this.setState({
      input,
    });

    const errors = validateLogin(input);
    if (errors) {
      this.setState({ errors });
    }
  }
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.submit();
    }
  }
  submit() {
    const { email, password, rememberMe } = this.state;
    const errors = validateLogin({ email, password, rememberMe });
    if (errors) {
      this.setState({ errors });
      return;
    }
    this.props.dispatch(initiateLogin(email, password, rememberMe));
  }
  render() {
    let errorComponents = [];
    if (this.state.errorMessage) {
      errorComponents = [<div className={css.loginFormComponent}><span>{this.state.errorMessage}</span></div>];
    }
    const { email, password, rememberMe, submitting, errors } = this.state;
    return <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div className={css.loginBody}>
        <Paper>
          <form onSubmit={this.submit}>
            <div className={css.loginFormContainer}>
              <div className={css.loginFormComponent}>
                <TextField
                  hintText="Email Address"
                  value={email}
                  errorText={errors.email}
                  name="email"
                  onChange={this.onChange}
                />
              </div>

              <div className={css.loginFormComponent}>
                <TextField
                  onKeyDown={this.handleKeyDown}
                  type="password"
                  hintText="Password on"
                  value={password}
                  errorText={errors.password}
                  onChange={this.onChange}
                  name="password"
                />
              </div>
              <RaisedButton
                className={css.loginFormComponent}
                onClick={this.submit}
                disabled={submitting}
              >
                Log In
              </RaisedButton>
              {errorComponents}
              <div className={css.loginFormComponent}>
                <Link to="/register">Not a member? Register here.</Link>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    </MuiThemeProvider>;
  }
}

LoginFormComponent.displayName = 'LoginForm';


export default connect()(LoginFormComponent);