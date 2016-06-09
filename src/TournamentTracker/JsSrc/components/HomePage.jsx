import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import * as actionCreators from '../actions/action_creators';
import * as pingActions from '../actions/ping_actions';

export const HomePage = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        return <div>
           <span>This is an awesome new app</span>
           <span>{this.props.isPinging}</span>
           <span>{this.props.pingReceived}</span>
           <button onClick={() => this.props.initiatePing()}>PING</button>
        </div>;
    } 
});

//Makes properties from the redux state tree available to the component in the form of props
function mapStateToProps(state){
    return{
        isPinging: state.PingReducer.isPinging,
        pingReceived: state.PingReducer.pingReceived
    }
}

//Hook up the home page container with redux connect.
export const HomePageContainer = connect(mapStateToProps, pingActions)(HomePage);
