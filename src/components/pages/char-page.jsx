import React, {Component} from 'react';
import RowBlock from '../row-block/row-block';
import ItemList from '../item-list/item-list';
import ItemDetails, {Record} from '../item-details/item-details';
import ErrorBoundry from '../error-boundry/error-boundry';

export default class CharPage extends Component {

    state = {
        selectedChar: null,
    };

    onItemSelected = (charId) => {
        this.setState({selectedChar: charId});
    };

    render() {
        const {selectedChar} = this.state;
        const {getData} = this.props;
        const itemList = (
          <ItemList
            onItemSelected={this.onItemSelected}
            getData={getData.getAllCharacters}>
              {/*Рендер-функция переданная как children*/}
              {i => (
                `${i.name} (${i.gender} ${i.culture})`
              )}
          </ItemList>
        );

        const charDetails = (
          <ErrorBoundry>
              <ItemDetails
                itemId={selectedChar}
                getData={() => getData.getCharacter(selectedChar)}>
                  <Record field='gender' label='Gender'/>
                  <Record field='born' label='Born'/>
                  <Record field='culture' label='Culture'/>
              </ItemDetails>
          </ErrorBoundry>
        )

        return (
          <ErrorBoundry>
              {/*props.children*/}
              {RowBlock(itemList, charDetails)}
              {/*//Либо так (при деструктуризации аргументов функции)
              <RowBlock left={itemList} right={charDetails} />*/}
          </ErrorBoundry>
        )
    }
};