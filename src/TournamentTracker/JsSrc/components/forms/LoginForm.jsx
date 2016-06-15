import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {reduxForm} from 'redux-form';
import {validateLogin} from '../../validators/validateLogin';
import {initiateLogin} from '../../actions/user_actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Link} from 'react-router';

const submit = (values, dispatch) =>{
    return new Promise((resolve, reject) => {
        dispatch(initiateLogin(values.email, values.password, values.rememberMe));
        resolve();
    });
};


const LoginFormComponent = React.createClass({
    mixins: [PureRenderMixin],
    handleKeyDown : function(e, handleSubmit){
        if (e.keyCode == 13) { 
            handleSubmit();
            return false; 
        }
    },
    render: function(){
        const { fields: {email, password, rememberMe}, handleSubmit, submitting} = this.props;
        return <MuiThemeProvider muiTheme={getMuiTheme()}>  
        <div className="login-body">
            <Paper className="tt-login-form">
                <form onSubmit={handleSubmit(submit)}>
                    <div className="login-form-container">
                        <div className="login-form-component">
                            <TextField hintText="Email Address" {...email} />
                            {email.error && email.touched && <div>{email.error}</div>} 
                        </div>

                        <div className="login-form-component">
                            <TextField onKeyDown={(e) => this.handleKeyDown(e,handleSubmit(submit))} type="password" hintText="Password on" {...password} />
                            {password.error && password.touched && <div>{password.error}</div>} 
                        </div>

                        <RaisedButton className="login-form-component" onClick={handleSubmit(submit)} disabled={submitting}>Log In</RaisedButton>
                        
                        <div className="login-form-component">
                            <Link to="/register">Not a member? Register here.</Link>
                        </div>
                    </div>
                </form>          
            </Paper>
        </div>
        </MuiThemeProvider>;
    }
});

//Wire up the redux form
export default reduxForm({
    form: 'login',
    fields: ['email', 'password', 'rememberMe'],
    validate: validateLogin
})(LoginFormComponent);