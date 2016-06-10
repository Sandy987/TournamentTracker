import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {reduxForm} from 'redux-form';
import {validateLogin} from '../../validators/validateLogin';

const LoginFormComponent = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        const { fields: {username, password, rememberMe}, handleSubmit} = this.props;
        return <form onSubmit={handleSubmit}>
           <label>Username</label>
           <input type="text" {...name} />
           {username.error && username.touched && <div>{username.error}</div>} 
        
           <label>Password</label>
           <input type="password" {...password} />
           {password.error && password.touched && <div>{password.error}</div>} 

           <label>Remember Me</label>
           <input type="checkbox" {...rememberMe}/>
           {rememberMe.error && rememberMe.touched && <div>{rememberMe.error}</div>} 

           <button onClick={handleSubmit}>Log In</button>
        </form>;
    }
});

//Wire up the redux form
export default LoginForm = reduxForm({
    form: 'login',
    fields: ['username', 'password', 'rememberMe'],
    validate: validateLogin
})(LoginFormComponent);