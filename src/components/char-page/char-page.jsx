import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../item-list/item-list';
import CharDetails from '../char-details/char-details';
import ErrorMessage from '../error-message/error-message';

export default class CharPage extends Component {

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
        return (
          <Row>
              <Col md='5'>
                  <ItemList
                    onCharacterSelected={this.onCharacterSelected}
                  />
              </Col>
              <Col lg={{size: 4, offset: 3}}>
                  <CharDetails charId={this.state.selectedChar}/>
              </Col>
          </Row>
        )
    }
};