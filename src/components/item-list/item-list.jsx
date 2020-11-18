import React from 'react';
import './item-list.css'
import withData from '../hoc-helpers/with-data';

const ItemList = ({content}) => {
    return (
      <ul className="item-list list-group">
          {content}
      </ul>
    )
};

export default withData(ItemList);
