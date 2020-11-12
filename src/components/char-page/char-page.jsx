import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../item-list/item-list';
import CharDetails from '../char-details/char-details';
import ErrorBoundry from '../error-boundry/error-boundry';

// Элемент-контейнер (патерн)
const RowBlock = (left, right /*либо {left, right}*/) => {
    return (
      <Row>
          <Col md='5'>
              {left}
          </Col>
          <Col lg={{size: 4, offset: 3}}>
              {right}
          </Col>
      </Row>
    )
}

export default class CharPage extends Component {

    state = {
        selectedChar: null,
    };

    onCharacterSelected = (charId) => {
        this.setState({selectedChar: charId});
    };

    render() {

        const itemList = (
          <ItemList
            onCharacterSelected={this.onCharacterSelected}
            getData={this.props.getData}>

              {/*Рендер-функция переданная как children*/}
              {i => (
                `${i.name} (${i.gender} ${i.culture})`
              )}

          </ItemList>
        );

        const charDetails = (
          <ErrorBoundry>
              <CharDetails charId={this.state.selectedChar}/>
          </ErrorBoundry>
        )

        return (
          <ErrorBoundry>
              {RowBlock(charDetails, itemList)}
              {/*//Либо так (при деструктуризации аргументов функции)
              <RowBlock left={itemList} right={charDetails} />*/}
          </ErrorBoundry>
        )
    }
};