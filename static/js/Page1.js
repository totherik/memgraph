/**
 * @jsx React.DOM
 */

module React from 'react';
import Timer from 'Timer';


export default React.createClass({

    componentDidMount() {
        var start = new Date().getTime();

        this.setState({
            interval: setInterval(() => {
                React.renderComponent(
                    <Timer elapsed={new Date().getTime() - start} />,
                    document.getElementById('container')
                );
            }, 50)
        });
    },

    componentWillUnmount() {
        clearInterval(this.state.interval);
    },

    render() {
        return <div><h1>Page 1</h1><div id="container"></div><a href="/page2">Page 2</a></div>
    }

});
