import React, {Component} from 'react';
import Header from '../header/header';
import RandomChar from '../random-char/random-char';
import {Col, Row, Container} from 'reactstrap';
import ErrorBtn from '../error-btn/error-btn';
import ErrorMessage from '../error-message/error-message';
import CharPage from '../char-page/char-page';
import ItemList from '../item-list/item-list';
import ItemDetails from '../item-details/item-details';
import GotService from '../../services/got-service';

export default class App extends Component {

    gotService = new GotService();

    state = {
        showRandomChar: true,
        hasError: false
    };

    toggleRandomChar = () => {
        this.setState((state) => state.showRandomChar = !state.showRandomChar);
    };

    componentDidCatch(error, errorInfo) {
        console.log('Catch');
        this.setState({hasError: true});
    }

    render() {
        const {showRandomChar, hasError} = this.state;
        const toggledChar = showRandomChar ? <RandomChar/> : null;
        const btnText = showRandomChar ? 'Hide Character' : 'Show Character';

        if (hasError) {
            return <ErrorMessage/>
        }

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
                          <ErrorBtn/>
                      </Col>
                  </Row>

                  <CharPage/>

                  <Row>
                      <Col md='5'>
                          <ItemList
                            getData={this.gotService.getAllBooks}
                            onCharacterSelected={this.onCharacterSelected}>
                              {(item) => item.name}
                          </ItemList>
                      </Col>
                      <Col lg={{size: 4, offset: 3}}>
                          <ItemDetails charId={this.state.selectedChar}/>
                      </Col>
                  </Row>

                  <Row>
                      <Col md='5'>
                          <ItemList
                            getData={this.gotService.getAllHouses}
                            onCharacterSelected={this.onCharacterSelected}>
                              {(item) => item.name}
                          </ItemList>
                      </Col>
                      <Col lg={{size: 4, offset: 3}}>
                          <ItemDetails charId={this.state.selectedChar}/>
                      </Col>
                  </Row>

              </Container>
          </>
        )
    }
}