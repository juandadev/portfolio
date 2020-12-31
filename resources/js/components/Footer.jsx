import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import logo from '../../svg/logo.svg';

import '../../sass/Footer.scss';

const Footer = () => (
  <footer id="footer" className="footer">
    <Container>
      <Row>
        <Col className="d-flex justify-content-between align-items-center">
          <img className="footer--logo" src={logo} alt="Juan Daniel Logo" />

          <p className="footer--copy">© 2020 Juan Daniel Martínez. Todos los derechos reservados</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
