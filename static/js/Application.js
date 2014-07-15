/**
 * @jsx React.DOM
 */

module React from 'react';
module page from 'page';
import d3 from 'd3';
import Navigation from 'Navigation';
import Page1 from 'Page1';
import Page2 from 'Page2';
import AppDetail from 'AppDetail';


var Application = React.createClass({

    getInitialState() {
        return {
            history: [ { id: 1234 }, { id: 1235 }, { id: 1236 } ],
            component: <Page1 />
        };
    },

    componentWillMount () {
        React.renderComponent(<Navigation history={this.state.history} />, document.querySelector('section.top-bar-section'));
    },

    componentDidMount() {
        page('/(index.html)?', ctx => {
            this.setState({ component: <Page1 /> });
        });

        page('/page2', ctx => {
            this.setState({ component: <Page2 /> });
        });

        page('/app/:app_id', ctx => {
            this.setState({ component: <AppDetail key={ctx.params.app_id} id={ctx.params.app_id} /> });
        });

        page.start();
        page('/');
    },

    componentWillUnmount() {
        page.stop();
    },

    render() {
        return this.state.component;
    }

});

React.renderComponent(<Application/>, document.querySelector('#masthead'));
