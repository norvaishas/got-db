import React, {Component} from 'react';
import GotService from '../../services/got-service';
import Header from '../header/header';
import RandomHouse from '../random-house/random-house';
import ItemList from '../item-list/item-list';

/*

const got = new GotService();

got.getAllCharacters()
  .then(body => body.forEach(elem => console.log(elem.name)))

got.getSomeCharacter(583)
  .then(body => console.log(body.name))

*/

export default class App extends Component {
    render() {
        return (
          <div>
              <Header/>
              <div className={'someclass'}>Hello World!</div>
              <RandomHouse/>
              <ItemList/>
          </div>
        )
    }
}