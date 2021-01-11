import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

class Admin extends Component {
  constructor(props) {
    super(props);
  }

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
