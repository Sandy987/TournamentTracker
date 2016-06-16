import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {reduxForm} from 'redux-form';
import {validateLogin} from '../../validators/validateLogin';
import {initiateRegister} from '../../actions/user_actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Link} from 'react-router';

const submit = (values, dispatch) =>{
    return new Promise((resolve, reject) => {
        dispatch(initiateRegister(values.playername, values.email, values.password));
        resolve();
    });
};

const RegisterFormComponent = React.createClass({
    handleKeyDown : function(e, handleSubmit){
        if (e.keyCode == 13) { 
            handleSubmit();
            return false; 
        }
    },
    mixins: [PureRenderMixin],
    render: function(){
        var errorComponents = [];

        if (this.props.errorMessage){
            // errorComponents = [<div className="login-form-component"><span>Invalid email address or password</span></div>];
            errorComponents = [<div className="login-form-component"><span>{this.props.errorMessage}</span></div>];
        }

        const { fields: {playername, email, password}, handleSubmit, submitting} = this.props;
        return <MuiThemeProvider muiTheme={getMuiTheme()}> 
        <div className="login-body"> 
            <Paper className="tt-register-form">
                <form onSubmit={handleSubmit(submit)}>
                    <div className="login-form-container">
                        <div className="login-form-component">
                            <TextField hintText="Player Name" {...playername} />
                            {playername.error && playername.touched && <div>{playername.error}</div>} 
                        </div>

                        <div className="login-form-component">
                            <TextField hintText="Email Address" {...email} />
                            {email.error && email.touched && <div>{email.error}</div>} 
                        </div>

                        <div className="login-form-component">
                            <TextField onKeyDown={(e) => this.handleKeyDown(e,handleSubmit(submit))} type="password" hintText="Password" {...password} />
                            {password.error && password.touched && <div>{password.error}</div>} 
                        </div>

                        <RaisedButton className="login-form-component" onClick={handleSubmit(submit)} disabled={submitting}>Register</RaisedButton>
                        
                        {errorComponents}

                        <div className="login-form-component">
                            <Link to="/login">Already a member? Login here.</Link>
                        </div>
                    </div>
                </form>
            </Paper>
        </div>
        </MuiThemeProvider>;
    }
});

function mapStateToProps(state){
    return{
        errorMessage: state.activeUser.errorMessage
    };
}


//Wire up the redux form
const reduxxedForm = reduxForm({
    form: 'register',
    fields: ['playername', 'email', 'password'],
    validate: validateLogin
})(RegisterFormComponent);

export default connect(mapStateToProps)(reduxxedForm);