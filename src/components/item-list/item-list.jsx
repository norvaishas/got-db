import React from 'react';
import './item-list.css';
import withData from '../hoc-helpers/with-data';
import GotService from '../../services/got-service';

const ItemList = (props) => {

    const {loading, error, itemList, onCharacterSelected} = props;
    const chars = itemList.map((item) => {
        const {id} = item;
        const label = props.children(item);
        return (
          <li
            key={item.id}
            className="list-group-item"
            onClick={() => onCharacterSelected(id)}
          >
              {label}
          </li>
        )
    });
    const content = !loading && !error ? <>{chars}</> : null;

    return (
      <ul className="item-list list-group">
          {content}
      </ul>
    );
};

const {getAllCharacters} = new GotService();

export default withData(ItemList, getAllCharacters);
