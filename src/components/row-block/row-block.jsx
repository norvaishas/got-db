import {Col, Row} from 'reactstrap';
import React from 'react';

const RowBlock = ({left, right}) => {
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
};

export default RowBlock;