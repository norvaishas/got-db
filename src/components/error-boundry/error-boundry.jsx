import React, {Component} from 'react';
import ErrorMessage from '../error-message/error-message';

export default class ErrorBoundry extends Component {

    state = {
        hasError: false
    }

    componentDidCatch(error, errorInfo) {

        this.setState({
            hasError: true
        });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorMessage/>
        }

        return (
          this.props.children
        )
    };

};
