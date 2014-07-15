/**
 * @jsx React.DOM
 */

module d3 from 'd3';
module React from 'react';
import Chart from 'Chart';
import DataSeries from 'DataSeries';


function values(obj) {
    return Object.keys(obj).map(function (prop) {
        return obj[prop];
    });
}


function zip(arr) {
    var result = [];
    arr.forEach(function (arr) {
        arr.forEach(function (elem, idx) {
            result[idx] = result[idx] || (result[idx] = []);
            result[idx].push(elem);
        });
    });
    return result;
}


function min(arr, prop) {
    return arr
            .map(function(values) {
                return values.reduce(function (memo, value) {
                    return Math.min(memo, value[prop]);
                }, Number.MAX_VALUE);
            })
            .reduce(function (memo, value) {
                return Math.min(memo, value);
            }, Number.MAX_VALUE);
}


function max(arr, prop) {
    return arr
            .map(function(values) {
                return values.reduce(function (memo, value) {
                    return Math.max(memo, value[prop]);
                }, 0);
            })
            .reduce(function (memo, value) {
                return Math.max(memo, value);
            }, 0);
}


/* http://10consulting.com/2014/02/19/d3-plus-reactjs-for-charting/ */
export default React.createClass({

    getDefaultProps() {
        return {
            data: {},
            width: 600,
            height: 300
        };
    },

    render() {
        var size, zipped, yMin, yMax, xMin, xMax, xScale, yScale, colors;

        size = {
            width: this.props.width,
            height: this.props.height
        };

        zipped = zip(values(this.props.data));
        xMin = min(zipped, 'x');
        xMax = max(zipped, 'x');
        yMin = min(zipped, 'y');
        yMax = max(zipped, 'y');

        xScale = d3.scale.linear()
            .domain([xMin, xMax])
            .range([0, this.props.width]);

        yScale = d3.scale.linear()
            .domain([yMin, yMax])
            .range([this.props.height, 0]);

        colors = d3.scale.category20();

        return (
            <Chart width={this.props.width} height={this.props.height}>
                {Object.keys(this.props.data).map((series, i) => {
                    return <DataSeries data={this.props.data[series]} key={series} size={size} xScale={xScale} yScale={yScale} color={colors(i)} />
                })}
            </Chart>
        );
    }

});
