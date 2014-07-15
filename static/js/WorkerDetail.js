/**
 * @jsx React.DOM
 */

module React from 'react';
module $ from 'jquery';
import LineChart from 'LineChart';


export default React.createClass({

    getInitialState() {
        return {
            usage: [],
            load: [],
            stats: []
        };
    },

    componentDidMount() {
        $.get(this.props.usage, result => {
            this.setState({
                usage: result
            });
        });

        $.get(this.props.load, result => {
            this.setState({
                load: result
            });
        });

        $.get(this.props.stats, result => {
            this.setState({
                stats: result
            });
        });
    },

    render() {

        var usage = {
            rss: this.state.usage.map(function (record) {
                return {
                    x: Date.parse(record.ts),
                    y: record.data.rss
                };
            }),

            heapUsed: this.state.usage.map(function (record) {
                return {
                    x: Date.parse(record.ts),
                    y: record.data.heapUsed
                };
            }),

            heapTotal: this.state.usage.map(function (record) {
                return {
                    x: Date.parse(record.ts),
                    y: record.data.heapTotal
                };
            }),
        };

        var load = {
            oneMinAvg: this.state.load.map(function (record) {
                return {
                    x: Date.parse(record.ts),
                    y: record.data[0]
                }
            }),
            fiveMinAvg: this.state.load.map(function (record) {
                return {
                    x: Date.parse(record.ts),
                    y: record.data[1]
                }
            }),
            fifteenMinAvg: this.state.load.map(function (record) {
                return {
                    x: Date.parse(record.ts),
                    y: record.data[2]
                }
            })
        }

        return (
            <div class="row">
                <div class="small-2 large-4 columns">
                    <h3>Memory Usage</h3>
                    <LineChart data={usage} />
                </div>
                <div class="small-4 large-4 columns">
                    <h3>Load Average</h3>
                    <LineChart data={load} />
                </div>
                <div class="small-6 large-4 columns">{this.state.load.length}</div>
            </div>
        );
    }

});
