/**
 * @jsx React.DOM
 */

module d3 from 'd3';
module React from 'react';
import Line from 'Line';


/* http://10consulting.com/2014/02/19/d3-plus-reactjs-for-charting/ */
export default React.createClass({

    getDefaultProps() {
        return {
            data: [],
            interpolate: 'linear'
        }
    },

    render() {
        var path;

        path = d3.svg.line()
            .x(d => { return this.props.xScale(d.x); })
            .y(d => { return this.props.yScale(d.y); })
            .interpolate(this.props.interpolate);

        return (
            <Line path={path(this.props.data)} color={this.props.color} />
        )
    }
});
