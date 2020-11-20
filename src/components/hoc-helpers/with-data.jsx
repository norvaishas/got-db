import React, {Component} from 'react';
import ErrorMessage from '../error-message/error-message';
import Spinner from '../spinner/spinner';

const withData = (View, getData) => {
    return class extends Component {

        state = {
            itemList: null,
            loading: true,
            error: false
        };

        componentDidMount() {
            getData()
              .then(itemList => this.setState({
                  itemList,
                  loading: false,
                  error: false
              }))
              .catch(err => this.setState({
                  itemList: null,
                  loading: false,
                  error: true
              }));
        };

        render() {
            const {itemList, error} = this.state;

            if (error) {
                return <ErrorMessage/>
            }

            if (!itemList) {
                return <Spinner/>
            }
            return <View {...this.props} {...this.state}/>
        }
    }
};

export default withData;