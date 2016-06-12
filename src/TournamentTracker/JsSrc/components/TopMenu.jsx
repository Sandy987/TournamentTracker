import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export const TopMenu = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        return <AppBar title='T-Ts Tournament Tracker'>
            <FlatButton><Link to="/">Home</Link></FlatButton>
            <FlatButton><Link to="/account">Account</Link></FlatButton>
        </AppBar>;
    } 
});

//Makes properties from the redux state tree available to the component in the form of props
function mapStateToProps(state){
    return{
        
    }
}

//Hook up the home page container with redux connect.
export default connect(mapStateToProps)(TopMenu);
