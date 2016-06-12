import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {reduxForm} from 'redux-form';
import {validateLogin} from '../../validators/validateLogin';
import {initiateRegister} from '../../actions/user_actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const submit = (values, dispatch) =>{
    return new Promise((resolve, reject) => {
        dispatch(initiateRegister(values.email, values.password));
        resolve();
    });
};

const LoginFormComponent = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        const { fields: {email, password}, handleSubmit, submitting} = this.props;
        return <MuiThemeProvider muiTheme={getMuiTheme()}>  
            <Paper className="tt-register-form">
                <form onSubmit={handleSubmit(submit)}>
                    <div>
                        <TextField hintText="Email Address" {...email} />
                        {email.error && email.touched && <div>{email.error}</div>} 
                    </div>

                    <div>
                        <TextField type="password" hintText="Password" {...password} />
                        {password.error && password.touched && <div>{password.error}</div>} 
                    </div>

                    <RaisedButton onClick={handleSubmit(submit)} disabled={submitting}>Register</RaisedButton>
                </form>
            </Paper>
        </MuiThemeProvider>;
    }
});

//Wire up the redux form
export default reduxForm({
    form: 'register',
    fields: ['email', 'password'],
    validate: validateLogin
})(LoginFormComponent);