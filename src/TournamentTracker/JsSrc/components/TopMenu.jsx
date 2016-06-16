import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import * as NavActions from '../actions/nav_actions';
import { push } from 'react-router-redux';
import {initiateLogout} from '../actions/user_actions';

export const TopMenu = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        var notificationPath = `/notifications/${this.props.activeUser.Id}`;

        return (<div>
            <AppBar title="T-Ts Tournament Tracker" onLeftIconButtonTouchTap={(e) => this.props.routerOpenMenu()}></AppBar>
            <Drawer
            open={this.props.isMenuOpen}
            docked={false}
            onRequestClose={(e) => this.props.routerCloseMenu()}
            onRequestChange={(open) => open ? this.props.routerOpenMenu() : this.props.routerCloseMenu()}>
            <Menu>
                <MenuItem onTouchTap={(e) => navigateTo('/home', this.props)}>Ranking</MenuItem>
                <MenuItem onTouchTap={(e) => navigateTo('/account', this.props)} >Profile</MenuItem>
		        <MenuItem onTouchTap={(e) => navigateTo('/challenges', this.props)}>My Matches</MenuItem>	
                <MenuItem onTouchTap={(e) => navigateTo(notificationPath, this.props)} >Notifications</MenuItem>
                 <MenuItem onTouchTap={(e) => this.props.initiateLogout()} >Log Out</MenuItem>
            </Menu>
            </Drawer> 
        </div>);
    }   
});

function navigateTo(path, props){

    props.routerCloseMenu();
    props.push(path);
}
//Makes properties from the redux state tree available to the component in the form of props
function mapStateToProps(state){
    return{
        isMenuOpen : state.nav.isMenuOpen,
        anchorElement : state.nav.anchorElement,
        activeUser : state.activeUser.user
    };
}

var compiledFunctions = Object.assign({}, NavActions);
compiledFunctions.push = push
compiledFunctions.initiateLogout = initiateLogout;

//Hook up the home page container with redux connect.
export default connect(mapStateToProps, compiledFunctions)(TopMenu);
