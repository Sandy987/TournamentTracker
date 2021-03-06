﻿//An example of a root app component. 
//The purpose of the root component is to render all the markup that is
//common across all routes.

//Don't use th Pure Render Mixin with App.jsx, it causes issues with React Router


import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopMenuContainer from './TopMenu';

//How this works is that is renders all child components passed into the children prop
//This is what React Router does for us
export default React.createClass({
    render: function() {
        return <MuiThemeProvider muiTheme={getMuiTheme()}> 
        <div>
            <TopMenuContainer />
            {this.props.children}
        </div>
        </MuiThemeProvider>;
    }
});