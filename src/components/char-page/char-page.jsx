import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../item-list/item-list';
import ItemDetails, {Record} from '../item-details/item-details';
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

    onItemSelected = (charId) => {
        this.setState({selectedChar: charId});
    };

    render() {
        const itemList = (
          <ItemList
            onItemSelected={this.onItemSelected}
            getData={this.props.getData.getAllCharacters}>
              {/*Рендер-функция переданная как children*/}
              {i => (
                `${i.name} (${i.gender} ${i.culture})`
              )}
          </ItemList>
        );

        const charDetails = (
          <ErrorBoundry>
              <ItemDetails
                itemId={this.state.selectedChar}
                getData={this.props.getData}>
                  <Record field='gender' label='Gender'/>
                  <Record field='born' label='Born'/>
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