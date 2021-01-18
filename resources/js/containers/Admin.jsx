import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Container, Row, Col, Tab, Button, Nav } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Editor from '../components/Editor';

import '../../sass/Admin.scss';

class Admin extends Component {
  componentDidMount() {
    document.title = 'Panel de administración';
  }

  render() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return (
        <>
          <Header />

          <main className="admin">
            <Container>
              <Tab.Container id="left-tabs-example" defaultActiveKey="new">
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="view">Ver entradas</Nav.Link>
                      </Nav.Item>

                      <Nav.Item>
                        <Nav.Link eventKey="new">Nueva entrada</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>

                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="view"></Tab.Pane>

                      <Tab.Pane eventKey="new">
                        <Editor />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Container>
          </main>
        </>
      );
    }

    return <Redirect to="/" />;
  }
}

Admin.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

export default connect(mapStateToProps, null)(Admin);
