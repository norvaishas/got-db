import React, {Component} from 'react';
import Header from '../header/header';
import RandomChar from '../random-char/random-char';
import {Col, Row, Container} from 'reactstrap';
import ErrorBtn from '../error-btn/error-btn';
import ErrorMessage from '../error-message/error-message';
import CharPage from '../pages/char-page';
import BookPage from '../pages/book-page';
import HousePage from '../pages/house-page';
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
                  <CharPage getData={this.gotService} />
                  <BookPage getData={this.gotService}/>
                  <HousePage getData={this.gotService}/>
              </Container>
          </>
        )
    }
}