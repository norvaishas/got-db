import React, {Component} from 'react';
import './random-char.css';
import GotService from '../../services/got-service';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';

export default class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false,
    };

    gotService = new GotService();

    componentDidMount() {
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter, 2500);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharacterLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        });
    };

    onError = (err) => {
        this.setState({
            loading: false,
            error: true
        });
    };

    updateCharacter = () => {
        const id = Math.floor(Math.random() * 2500 + 25);
        this.gotService.getCharacter(id)
          .then(this.onCharacterLoaded)
          .catch(this.onError);
    };

    render() {
        const {char, loading, error} = this.state;

        /*Здесь создаются переменные которые будут переданы в JSX разметку.
            Т.к. JSX игнорирует null, то он просто пропустит его
            и отрендерит ту переменную которая будет содержит компонент*/

        const content = !loading && !error ? <ViewChar char={char}/> : null;
        const spinner = loading ? <Spinner/> : null;
        const errMsg = !content && !spinner ? <ErrorMessage/> : null;

        return (
          <div className="random-block rounded">
              {spinner} {/* Будет виден только если loading === true */}
              {content} {/* Будет виден только если loading !== true */}
              {errMsg}
          </div>
        )
    }
};

const ViewChar = ({char}) => {
    const {name, gender, born, died, culture} = char;

    return (
      <>
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
      </>
    )
};