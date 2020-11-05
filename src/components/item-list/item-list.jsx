import React, {Component} from 'react';
import './item-list.css'
import GotService from '../../services/got-service';
import Spinner from '../spinner/spinner';


export default class ItemList extends Component {
    gotService = new GotService();

    state = {
        charList: null,
    };

    componentDidMount() {
        this.gotService.getAllCharacters()
          .then(charList => this.setState({charList}))
          .catch(err => this.setState({charList: null}));
    };

    createCharList(arr) {
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
        const {charList} = this.state;

        if (!charList) {
            return <Spinner/>
        }

        const chars = this.createCharList(charList);

        return (
          <ul className="item-list list-group">
              {chars}
          </ul>
        )
    }
}
