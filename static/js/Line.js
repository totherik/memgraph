/**
 * @jsx React.DOM
 */

module d3 from 'd3';
module React from 'react';


/* http://10consulting.com/2014/02/19/d3-plus-reactjs-for-charting/ */
export default React.createClass({

    getDefaultProps() {
        return {
            path: '',
            color: 'blue',
            width: 1
        };
    },

    render: function() {
        return (
            <path d={this.props.path} stroke={this.props.color} strokeWidth={this.props.width} fill="none" />
        );
    }
});
