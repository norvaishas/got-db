import React, {Component} from 'react';
import './item-list.css'
import GotService from '../../services/got-service';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';


export default class ItemList extends Component {
    gotService = new GotService();

    state = {
        charList: null,
        loading: true,
        error: false
    };

    componentDidMount() {
        this.gotService.getAllCharacters()
          .then(charList => this.setState({
              charList,
              loading: false,
              error: false
          }))
          .catch(err => this.setState({
              charList: null,
              loading: false,
              error: true
          }));
    };

    createCharList(arr) {
        console.log(arr)
        return arr.map((elem) => {
            return (
              <li
                key={elem.id}
                className="list-group-item"
                onClick={() => this.props.onCharacterSelected(elem.id)}
              >
                  {elem.name}
              </li>
            )
        })
    };

    render() {
        const {charList, loading, error} = this.state;

        if (error) {
            return <ErrorMessage/>
        }

        if (!charList) {
            return <Spinner/>
        }

        const chars = this.createCharList(charList);
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
