import React, {Component} from 'react';
import ErrorMessage from '../error-message/error-message';
import Spinner from '../spinner/spinner';

const withData = (View) => {
    return class extends Component {
        state = {
            itemList: null,
            loading: true,
            error: false
        };

        componentDidMount() {
            const {getData} = this.props;

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

        renderItems(arr) {
            return arr.map((item) => {
                const {id} = item;
                //Use render-func in children-prop
                const renderLabel = this.props.children(item);
                return (
                  <li
                    className="list-group-item"
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}>
                      {renderLabel}
                  </li>
                )
            })
        };

        render() {
            const {itemList, loading, error} = this.state;

            if (error) {
                return <ErrorMessage/>
            }

            if (!itemList) {
                return <Spinner/>
            }

            const items = this.renderItems(itemList);
            const content = !loading && !error ? <>{items}</> : null;

            return <View
              {...this.props}
              content={content}/>
        }
    };
};

export default withData;