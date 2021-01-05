import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';

class Admin extends Component {
  componentDidMount() {
    document.title = 'Panel de administración';
  }

  render() {
    return (
      <>
        <Header />

        <main className="admin">
          <Container>
            <Row>
              <Col>
                <h1>Hola soy el Admin</h1>
              </Col>
            </Row>
          </Container>
        </main>
      </>
    );
  }
}

export default Admin;
