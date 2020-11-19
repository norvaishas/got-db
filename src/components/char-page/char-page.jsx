import React, {Component} from 'react';
import ItemList from '../item-list/item-list';
import ItemDetails from '../item-details/item-details';
import ErrorMessage from '../error-message/error-message';
import GotService from '../../services/got-service';
import RowBlock from '../row-block/row-block';
import ErrorBoundry from '../error-boundry/error-boundry';

export default class CharPage extends Component {

    gotService = new GotService();

    state = {
        selectedChar: null
    };

    onCharacterSelected = (charId) => {
        this.setState({selectedChar: charId});
    };

    render() {
        if (this.state.hasError) {
            return <ErrorMessage/>
        }
        const itemList = (
          <ErrorBoundry>
              <ItemList
                getData={this.gotService.getAllCharacters}
                onCharacterSelected={this.onCharacterSelected}>
                  {(i) => `${i.name} (${i.gender} ${i.culture})`}
              </ItemList>
          </ErrorBoundry>
        );

        const charDetails = (
          <ErrorBoundry>
              <ItemDetails charId={this.state.selectedChar}/>
          </ErrorBoundry>
        );

        return (
          <RowBlock left={itemList} right={charDetails}/>
        )
    }
};