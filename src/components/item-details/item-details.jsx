import React, {Component} from 'react';
import './item-details.css';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import ErrorBtn from '../error-btn/error-btn';


const Record = ({itemDetails, field, label}) => {
    return (
      <li className="list-group-item d-flex justify-content-between">
          <span className="term">{label}</span>
          {/*itemDetails стал доступен благодаря тому что его добавили мспользуя React.CloneElem..*/}
          <span>{itemDetails[field]}</span>
      </li>
    )
};

export {Record};

export default class ItemDetails extends Component {

    state = {
        itemDetails: null,
        error: false,
        loading: false,
    };

    componentDidMount() {
        this.updateItem(this.props.itemId);
    };

    componentDidUpdate(prevProps) {
        //Если внутри этого метода изменять стей, то обязательно надо проверить что пропсы изменились
        if (prevProps.itemId !== this.props.itemId) {
            this.updateItem(this.props.itemId);
        }
    };

    updateItem = (id) => {
        this.setState({loading: true});
        this.props.getData.getCharacter(id)
          .then(itemDetails => {
              this.setState({
                  itemDetails,
                  error: false,
                  loading: false,
              });
          })

          .catch(err => {
              console.log(err)
              this.setState({
                  error: true,
                  loading: false,
              });
          });
    };

    render() {
        console.log('Render ItemDetails')
        const { itemDetails, error, loading} = this.state;

        if (!itemDetails) {
            return <span>Выберите перснонажа</span>;
        }

        let content;
        if (!loading && !error) {
            const ch = this.props.children;
            const records = React.Children.map(ch, (child) => {
                //Добавление к клонируемым записям дополнительных свойств
                return React.cloneElement(child, {itemDetails});
            })
            content = <ViewItem item={itemDetails} fields={records}/>
        } else {
            content = null;
        }

        const spinner = loading ? <Spinner/> : null;
        const errorMsg = !content && !loading ? <ErrorMessage/> : null;

        return (
          <div className="item-details rounded">
              {spinner}
              {content}
              {errorMsg}
          </div>
        )
    };
};

const ViewItem = ({item, fields}) => {
    const {name, gender, born, died, culture} = item;
    return (
      <>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
              {/*<li className="list-group-item d-flex justify-content-between">
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
              </li>*/}
              {fields}
          </ul>
          <ErrorBtn/>
      </>
    )
}