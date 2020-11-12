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

    renderItemList(arr) {
        return arr.map((item) => {
            const {id} = item;
            //Use render-func & children-prop
            const renderLabel = this.props.children(item);
            return (
              <li
                className="list-group-item"
                key={id}
                onClick={() => this.props.onCharacterSelected(id)}>
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

        const chars = this.renderItemList(itemList);
        const content = !loading && !error ? <List chars={chars}/> : null;

        return (
          <ul className="item-list list-group">
              {content}
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
