import React, {Component} from 'react';
import './random-char.css';
import GotService from '../../services/got-service';

const some = new GotService();
some.getAllHouses().then(qwe => console.log(qwe))

export default class RandomChar extends Component {

    constructor() {
        super();
        this.updateCharacter();
    }

    got = new GotService();

    state = {
        name: null,
        gender: null,
        born: null,
        died: null,
        culture: null,
    };

    updateCharacter = () => {
        const id = Math.floor(Math.random() * 2000 + 25);
        this.got.getCharacter(id)
          .then(char => {
              this.setState(char);
          })
          .catch(error => console.log(error));
    };

    render() {
        const {name, gender, born, died, culture} = this.state;
        return (
          <div className="random-block rounded">
              <h4>Random Character: <span className='main'>{name}</span></h4>
              <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                      <span className="term">Gender </span>
                      <span>{gender}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                      <span className="term">Born </span>
                      <span>{born}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                      <span className="term">Died </span>
                      <span>{died}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                      <span className="term">Culture </span>
                      <span>{culture}</span>
                  </li>
              </ul>
          </div>
        )
    }
};