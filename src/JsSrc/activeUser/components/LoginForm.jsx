import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { reduxForm } from 'redux-form';
import { validateLogin } from '../validateLogin';
import { initiateLogin } from '../actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router';
import css from './styles.css';

class LoginFormComponent extends Component {
  constructor() {
    super();

    this.submit = this.submit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  submit(values, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(initiateLogin(values.email, values.password, values.rememberMe));
      resolve();
    });
  }
  handleKeyDown(e) {
    const { handleSubmit } = this.props;
    if (e.keyCode === 13) {
      handleSubmit(this.submit);
    }
  }
  render() {
    let errorComponents = [];
    if (this.props.errorMessage) {
      errorComponents = [<div className={css.loginFormComponent}><span>{this.props.errorMessage}</span></div>];
    }
    const { fields: { email, password, rememberMe }, handleSubmit, submitting } = this.props;
    return <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div className={css.loginBody}>
        <Paper>
          <form onSubmit={handleSubmit(this.submit)}>
            <div className={css.loginFormContainer}>
              <div className={css.loginFormComponent}>
                <TextField hintText="Email Address" {...email} />
                {email.error && email.touched && <div>{email.error}</div>}
              </div>

              <div className={css.loginFormComponent}>
                <TextField
                  onKeyDown={(e) => this.handleKeyDown(e, handleSubmit(this.submit))}
                  type="password" hintText="Password on" {...password}
                />
                {password.error && password.touched && <div>{password.error}</div>}
              </div>

              <RaisedButton
                className={css.loginFormComponent}
                onClick={handleSubmit(this.submit)}
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

function mapStateToProps(state) {
  return {
    errorMessage: state.activeUser.errorMessage,
  };
}

// Wire up the redux form
const reduxxedForm = reduxForm({
  form: 'login',
  fields: ['email', 'password', 'rememberMe'],
  validate: validateLogin,
})(LoginFormComponent);

export default connect(mapStateToProps)(reduxxedForm);