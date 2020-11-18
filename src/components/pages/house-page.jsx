import React, {Component} from 'react';
import RowBlock from '../row-block/row-block';
import ItemList from '../item-list/item-list';
import ItemDetails, {Record} from '../item-details/item-details';
import ErrorBoundry from '../error-boundry/error-boundry';

export default class HousePage extends Component {

    state = {
        selectedHouse: null,
    };

    onItemSelected = (houseId) => {
        this.setState({selectedHouse: houseId});
    };

    render() {
        const itemList = (
          <ItemList
            onItemSelected={this.onItemSelected}
            getData={this.props.getData.getAllHouses}>
              {/*Рендер-функция*/}
              {item => item.name}
          </ItemList>
        );

        const charDetails = (
          <ErrorBoundry>
              <ItemDetails
                itemId={this.state.selectedHouse}
                getData={() => this.props.getData.getHouse(this.state.selectedHouse)}>
                  <Record field='region' label='Region'/>
                  <Record field='words' label='Words'/>
                  <Record field='founder' label='Founder'/>
                  <Record field='founded' label='Founded'/>
              </ItemDetails>
          </ErrorBoundry>
        )

        return (
          <ErrorBoundry>
              {RowBlock(itemList, charDetails)}
          </ErrorBoundry>
        )
    }
};