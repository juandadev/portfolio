/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import Header from '../components/Header';

import CookieService from '../services/CookieService';

import loading from '../../svg/loading.svg';

import '../../sass/Auth.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      remember: false,
      message: '',
      status: '',
      isLoading: false,
      show: false,
      alert: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setShow = this.setShow.bind(this);
  }

  componentDidMount() {
    document.title = 'Iniciar sesión';
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { remember } = this.state;
    const data = {};

    if (name === 'remember') {
      data[name] = !remember;
    } else {
      data[name] = value;
    }

    this.setState(data);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { username, password, remember } = this.state;

    this.setState({ isLoading: true });

    axios
      .post('/api/login', {
        username,
        password,
      })
      .then((response) => {
        // localStorage.setItem('userData', JSON.stringify(data));

        const { access_token } = response.data;

        console.log(response.data);

        this.setState({
          isLoading: false,
          status: '¡Inicio de sesión exitoso!',
          message: 'Ahora puedes acceder al panel de administrador',
          show: true,
          alert: 0,
        });

        if (!remember) {
          CookieService.set('access_token', access_token, { path: '/' });
        } else {
          const date = new Date();
          date.setTime(date.getTime() + 60 * 24 * 60 * 1000);

          CookieService.set('access_token', access_token, { path: '/', expires: date });
        }

        localStorage.setItem('isLoggedIn', true);
        window.location.href = '/admin';
      })
      .catch((error) => {
        console.error(error);

        if (error.response) {
          const { data } = error.response;

          this.setState({
            isLoading: false,
            status: data.error,
            message: data.error_description,
            show: true,
            alert: 1,
          });
        }
      });
  }

  setShow(value) {
    this.setState({ show: value });
  }

  render() {
    const { isLoggedIn } = this.props;
    const { show, alert, status, message, isLoading } = this.state;

    if (isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <Header />

        <main className="auth login">
          <Container>
            <Row>
              <Col>
                <Card>
                  <Card.Header>Iniciar sesión</Card.Header>

                  <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId="username">
                        <Form.Label>Correo</Form.Label>

                        <Form.Control
                          name="username"
                          type="email"
                          placeholder="Ingresa tu correo"
                          onChange={this.handleChange}
                        />
                      </Form.Group>

                      <Form.Group controlId="password">
                        <Form.Label>Contraseña</Form.Label>

                        <Form.Control
                          name="password"
                          type="password"
                          placeholder="Ingresa tu contraseña"
                          onChange={this.handleChange}
                        />
                      </Form.Group>

                      <Form.Group controlId="remember">
                        <Form.Check
                          type="checkbox"
                          name="remember"
                          label="Mantener sesión iniciada"
                          onClick={this.handleChange}
                        />
                      </Form.Group>

                      <Alert show={show} variant={`${alert === 0 ? 'success' : 'danger'}`}>
                        <Alert.Heading>{status}</Alert.Heading>

                        <p>{message}</p>

                        <hr />

                        <div className="d-flex justify-content-end">
                          <Button
                            onClick={() => this.setShow(false)}
                            variant={`outline-${alert === 0 ? 'success' : 'danger'}`}
                          >
                            Cerrar
                          </Button>
                        </div>
                      </Alert>

                      <Button variant="form" type="submit">
                        {isLoading ? <img src={loading} alt="Lodaing spinner" /> : ''}
                        Ingresar
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </main>
      </>
    );
  }
}

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

export default connect(mapStateToProps, null)(Login);
