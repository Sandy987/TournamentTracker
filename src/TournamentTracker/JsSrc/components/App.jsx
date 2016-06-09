//An example of a root app component. 
//The purpose of the root component is to render all the markup that is
//common across all routes.

//Don't use th Pure Render Mixin with App.jsx, it causes issues with React Router


import React from 'react';

//How this works is that is renders all child components passed into the children prop
//This is what React Router does for us
export default React.createClass({
    render: function() {
        return this.props.children;
    }
});