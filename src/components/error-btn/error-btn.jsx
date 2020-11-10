import React, {Component} from 'react';

export default class ErrorBtn extends Component {

    state = {
        renderError: false
    };

    render() {
        console.log('render');
        if (this.state.renderError) {
            this.ololo.lalala = 0;
        }

        return (
          <button
            onClick={() => this.setState({renderError: true})}>
              Throw error
          </button>
        )
    }
};