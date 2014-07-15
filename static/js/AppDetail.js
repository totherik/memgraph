/**
 * @jsx React.DOM
 */

module React from 'react';
module $ from 'jquery';
import WorkerDetail from 'WorkerDetail';


export default React.createClass({

    getInitialState() {
        return {
            workers: []
        };
    },

    componentDidMount() {
        $.get('/api/app/' + this.props.id + '/workers', result => {
            this.setState({
                workers: result
            });
        });
    },

    render() {
        return (<div>
            {this.state.workers.map(function (worker) {
                return <WorkerDetail key={worker.pid} pid={worker.pid} usage={worker.usage_url} load={worker.load_url} stats={worker.stats_url} />;
            })}
        </div>);
    }

});
