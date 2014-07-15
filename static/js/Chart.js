/**
 * @jsx React.DOM
 */

module d3 from 'd3';
module React from 'react';
import Line from 'Line';


/* http://10consulting.com/2014/02/19/d3-plus-reactjs-for-charting/ */
export default React.createClass({

    render() {
        return (
            <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
        );
    }

});
