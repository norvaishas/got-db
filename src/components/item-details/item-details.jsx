import React, {Component} from 'react';
import './item-details.css';
import GotService from '../../services/got-service';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import ErrorBtn from '../error-btn/error-btn';

export default class ItemDetails extends Component {

    state = {
        itemDetails: null,
        error: false,
        loading: false,
    };

    gotService = new GotService();

    componentDidMount() {
        this.updateChar(this.props.charId);
    };

    componentDidUpdate(prevProps) {
        //Если внутри этого метода изменять стей, то обязательно надо проверить что пропсы изменились
        if (prevProps.charId !== this.props.charId) {
            this.updateChar(this.props.charId);
        }
    };

    updateChar = (id) => {
        this.setState({loading: true});
        this.gotService.getCharacter(id)
          .then(itemDetails => {
              this.setState({
                  itemDetails,
                  error: false,
                  loading: false,
              });
          })
          .catch(err => {
              this.setState({
                  error: true,
                  loading: false,
              });
          });
    };

    render() {
        const { itemDetails, error, loading} = this.state;

        if (!itemDetails) {
            return <span>Выберите перснонажа</span>;
        }

        const content = !loading && !error ? <ViewChar char={itemDetails}/> : null;
        const spinner = loading ?  <Spinner/> : null;
        const errorMsg = !content && !loading ? <ErrorMessage/> : null;

        return (
          <div className="char-details rounded">
              {spinner}
              {content}
              {errorMsg}
          </div>
        )
    };
};

const ViewChar = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
      <>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                  <span className="term">Gender</span>
                  <span>{gender}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                  <span className="term">Born</span>
                  <span>{born}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                  <span className="term">Died</span>
                  <span>{died}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                  <span className="term">Culture</span>
                  <span>{culture}</span>
              </li>
          </ul>
          <ErrorBtn/>
      </>
    )
}