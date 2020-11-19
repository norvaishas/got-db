import React, {Component} from 'react';
import './item-list.css'
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';

export default class ItemList extends Component {

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
            const label = this.props.children(item)
            return (
              <li
                key={item.id}
                className="list-group-item"
                onClick={() => this.props.onCharacterSelected(id)}
              >
                  {label}
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

        const chars = this.renderItems(itemList);
        const content = !loading && !error ? <List chars={chars}/> : null;
        // const spinner = loading ? <Spinner/> : null;
        // const errMsg = !content && !loading ? <ErrorMessage/> : null;


        return (
          <ul className="item-list list-group">
              {content}
              {/*{spinner}*/}
              {/*{errMsg}*/}
          </ul>
        )
    }
};

const List = ({chars}) => {
    return(
      <>
          {chars}
      </>
    )
};
