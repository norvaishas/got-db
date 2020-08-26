import React, {Component} from 'react';
import GotService from '../../services/got-service';
import Header from '../header/header';
import RandomChar from '../random-char/random-char';
import ItemList from '../item-list/item-list';
import CharDetails from '../char-details/char-details';
import {Col, Row, Container} from 'reactstrap'

/*

const got = new GotService();

got.getAllCharacters()
  .then(body => body.forEach(elem => console.log(elem.name)))

got.getSomeCharacter(583)
  .then(body => console.log(body.name))

*/

export default class App extends Component {
    render() {
        return (
          <>
              <Container>
                  <Header />
              </Container>
              <Container>
                  <Row>
                      <Col lg={{size: 5, offset: 0}}>
                          <RandomChar/>
                      </Col>
                  </Row>
                  <Row>
                      <Col md='5'>
                          <ItemList />
                      </Col>
                      <Col lg={{size: 4, offset: 3}}>
                          <CharDetails />
                      </Col>
                  </Row>
              </Container>
          </>
        )
    }
}