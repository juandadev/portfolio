import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import Header from '../components/Header';

import loading from '../../svg/loading.svg';

import '../../sass/Auth.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      message: '',
      status: '',
      isLoading: false,
      redirect: false,
      msgEmail: false,
      msgPass: false,
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
    const data = {};

    data[name] = value;
    this.setState(data);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;

    this.setState({ isLoading: true });

    axios
      .post('/api/login', {
        email,
        password,
      })
      .then((response) => {
        this.setState({ isLoading: false });

        const { status, data, message, success, validation_error } = response.data;

        if (status === 200) {
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('userData', JSON.stringify(data));

          this.setState({
            message,
            status: '¡Inicio de sesión exitoso!',
            alert: 0,
            show: true,
            redirect: true,
          });
        } else if (status === 'failed' && success === undefined) {
          this.setState({
            message: validation_error.email ? validation_error.email : validation_error.password,
            status: '¡Error al iniciar sesión!',
            alert: 1,
            show: true,
          });
        } else if (status === 'failed' && success === false) {
          this.setState({
            message,
            status: '¡Error al iniciar sesión!',
            alert: 1,
            show: true,
          });
        }
      })
      .catch((error) => console.error(error));
  }

  setShow(value) {
    this.setState({ show: value });
  }

  render() {
    const { show, alert, status, message, redirect, isLoading } = this.state;

    if (redirect) {
      return <Redirect to="/admin" />;
    }

    const login = localStorage.getItem('isLoggedIn');

    if (login) {
      return <Redirect to="/admin" />;
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
                      <Form.Group controlId="email">
                        <Form.Label>Correo</Form.Label>

                        <Form.Control
                          name="email"
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

export default Login;
