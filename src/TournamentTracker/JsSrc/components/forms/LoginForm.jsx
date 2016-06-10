import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {reduxForm} from 'redux-form';
import {validateLogin} from '../../validators/validateLogin';
import * as userActions from '../../actions/user_actions';

const submit = (values, dispatch) =>{
    return new Promise((resolve, reject) => {
        dispatch(userActions.initiateLogin(values.username, values.password, values.rememberMe));
        resolve();
    });
};

const LoginFormComponent = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        const { fields: {username, password, rememberMe}, handleSubmit, submitting} = this.props;
        return <form onSubmit={handleSubmit(submit)}>
           <label>Username</label>
           <input type="text" {...name} />
           {username.error && username.touched && <div>{username.error}</div>} 
        
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
    fields: ['username', 'password', 'rememberMe'],
    validate: validateLogin
})(LoginFormComponent);