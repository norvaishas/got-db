import React, {Component} from 'react';
import ItemList from '../item-list/item-list';
import CharDetails from '../char-details/char-details';
import ErrorMessage from '../error-message/error-message';
import GotService from '../../services/got-service';
import RowBlock from '../row-block/row-block';

export default class CharPage extends Component {

    gotService = new GotService();

    state = {
        selectedChar: null,
        hasError: false
    };

    componentDidCatch(error, errorInfo) {
        console.log('Catch');
        this.setState({
            hasError: true
        });
    }

    onCharacterSelected = (charId) => {
        this.setState({selectedChar: charId});
    };

    render() {
        if (this.state.hasError) {
            return <ErrorMessage/>
        }
        const itemList = (
          <ItemList
            getData={this.gotService.getAllCharacters}
            onCharacterSelected={this.onCharacterSelected}
            renderItem={(i) => `${i.name} (${i.gender} ${i.culture})`}
          />
        );

        const charDetails = <CharDetails charId={this.state.selectedChar}/>;

        return (
          <RowBlock left={itemList} right={charDetails}/>
        )
    }
};