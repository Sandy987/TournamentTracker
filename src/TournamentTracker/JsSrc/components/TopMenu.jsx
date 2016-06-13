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
                <MenuItem onTouchTap={(e) => this.props.routerCloseMenu()}><Link to="/">Home</Link></MenuItem>
                <MenuItem onTouchTap={(e) => this.props.routerCloseMenu()}><Link to="/account">Account</Link></MenuItem>
                <MenuItem onTouchTap={(e) => this.props.routerCloseMenu()}><Link to="/challenges">Challenges</Link></MenuItem>
                <MenuItem onTouchTap={(e) => this.props.routerCloseMenu()}><Link to={notificationPath}>Notifications</Link></MenuItem>
            </Menu>
            </Drawer> 
        </div>);
    }   
});


//Makes properties from the redux state tree available to the component in the form of props
function mapStateToProps(state){
    return{
        isMenuOpen : state.nav.isMenuOpen,
        anchorElement : state.nav.anchorElement,
        activeUser : state.activeUser.user
    };
}

//Hook up the home page container with redux connect.
export default connect(mapStateToProps, NavActions)(TopMenu);
