import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const LoginForm = React.createClass({
    mixins: [PureRenderMixin],
    getLoginInfo: function(){
        return {
            username: React.findDOMNode(this.refs.username).value,
            password: React.findDOMNode(this.refs.password).value,
            rememberMe: React.findDOMNode(this.refs.rememberMe).checked
        }
    },
    render: function(){
        return <form id="LoginForm" action="" onSubmit={() => this.props.handleLoginSubmit(this.getLoginInfo())}>
           <label for="username">Username/Email</label>
           <input id="username" refs="username" type="text" />

           <label for="password">Password</label>
           <input id="password" refs="password" type="password" />

           <label for="remember">Remember Me</label>
           <input id="remember" refs="rememberMe" type="checkbox" />

           <input type="submit">Log In</input>
        </form>;
    }
});
