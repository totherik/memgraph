/**
 * @jsx React.DOM
 */

module React from 'react';
import Paragraph from 'Paragraph';


export default React.createClass({

    render() {
        var elapsed, seconds, message;
        elapsed = Math.round(this.props.elapsed  / 100);
        seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
        message = `React has been successfully running for ${seconds} seconds.`;
        return <Paragraph message={message} />;
    }

});
