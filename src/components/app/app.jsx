import React, {Component} from 'react';
import Header from '../header/header';
import RandomChar from '../random-char/random-char';
import ItemList from '../item-list/item-list';
import CharDetails from '../char-details/char-details';
import {Col, Row, Container} from 'reactstrap';

export default class App extends Component {

    state = {
        showRandomChar: true,
        selectedChar: null,
    };

    toggleRandomChar = () => {
        this.setState((state) => state.showRandomChar = !state.showRandomChar);
    };

    onCharacterSelected = (charId) => {
        this.setState({selectedChar: charId});
    };

    render() {
        const {showRandomChar} = this.state;
        const toggledChar = showRandomChar ? <RandomChar/> : null;
        const btnText = showRandomChar ? 'Hide Character' : 'Show Character';

        return (
          <>
              <Container>
                  <Header />
              </Container>
              <Container>
                  <Row>
                      <Col lg={{size: 5, offset: 0}}>
                          {toggledChar}
                      </Col>
                      <Col>
                          <button onClick={this.toggleRandomChar}>{btnText}</button>
                      </Col>
                  </Row>
                  <Row>
                      <Col md='5'>
                          <ItemList
                            onCharacterSelected={this.onCharacterSelected}
                          />
                      </Col>
                      <Col lg={{size: 4, offset: 3}}>
                          <CharDetails charId={this.state.selectedChar} />
                      </Col>
                  </Row>
              </Container>
          </>
        )
    }
}