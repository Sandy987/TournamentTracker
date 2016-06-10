import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import ProfileCard from './users/ProfileCard';

export const TopMenu = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        return <div>
            
            <ProfileCard playerName="Bob" playerRank="2000"/>   
        </div>;
    } 
});

//Makes properties from the redux state tree available to the component in the form of props
function mapStateToProps(state){
    return{
        
    }
}

//Hook up the home page container with redux connect.
export const TopmenuContainer = connect(mapStateToProps)(TopMenu);
