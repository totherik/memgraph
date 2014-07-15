/**
 * @jsx React.DOM
 */

module React from 'react';

export default React.createClass({

    getInitialState() {
        return {
            restarts: []
        };
    },

    componentDidMount() {
        $.get('/api/app', result => {
            this.setState({
                restarts: result
            });
        });
    },

    render() {
        var keys;

        keys = this.state.restarts.map(restart => {
            return restart.id.slice(-restart.id.indexOf('-'));
        });

        return (
            <ul class="right">
                {this.state.restarts.map(restart => {
                    var short = restart.id.slice(-restart.id.indexOf('-'));
                    return <li key={restart.id}><a href={'/app/' + restart.id}>{short}</a></li>;
                })}
            </ul>
        );
    }

});
