import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Link} from 'react-router';

export const TopMenu = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        return <div>
        </div>;
    } 
});

//Makes properties from the redux state tree available to the component in the form of props
function mapStateToProps(state){
    return{
        
    }
}

//Hook up the home page container with redux connect.
export default connect(mapStateToProps)(TopMenu);
