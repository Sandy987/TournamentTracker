import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {reduxForm} from 'redux-form';
import {validateLogin} from '../../validators/validateLogin';
import {initiateLogin} from '../../actions/user_actions';

const submit = (values, dispatch) =>{
    return new Promise((resolve, reject) => {
        dispatch(initiateLogin(values.email, values.password, values.rememberMe));
        resolve();
    });
};

const LoginFormComponent = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        const { fields: {email, password, rememberMe}, handleSubmit, submitting} = this.props;
        return <form onSubmit={handleSubmit(submit)}>
           <label>Email</label>
           <input type="text" {...email} />
           {email.error && email.touched && <div>{email.error}</div>} 
        
           <label>Password</label>
           <input type="password" {...password} />
           {password.error && password.touched && <div>{password.error}</div>} 

           <label>Remember Me</label>
           <input type="checkbox" {...rememberMe}/>
           {rememberMe.error && rememberMe.touched && <div>{rememberMe.error}</div>} 

           <button onClick={handleSubmit(submit)} disabled={submitting}>Log In</button>
        </form>;
    }
});

//Wire up the redux form
export default reduxForm({
    form: 'login',
    fields: ['email', 'password', 'rememberMe'],
    validate: validateLogin
})(LoginFormComponent);