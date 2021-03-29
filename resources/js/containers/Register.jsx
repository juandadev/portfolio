import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import Header from '../components/Header';

import loading from '../../svg/loading.svg';
import { Redirect } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginData: {
        name: '',
        email: '',
        password: '',
      },
      isLoading: false,
      confirm: false,
      show: false,
      alert: 0,
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.setShow = this.setShow.bind(this);
  }

  componentDidMount() {
    document.title = 'Registrar usuario';
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { loginData } = this.state;

    loginData[name] = value;

    this.setState({ loginData });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { loginData, confirm } = this.state;

    if (confirm) {
      this.setState({ isLoading: true });

      axios.post('/api/register', loginData).then((response) => {
        const { message, status } = response.data;

        this.setState({ isLoading: false });

        if (status === 200) {
          this.setState({
            message,
            show: true,
            alert: 0,
            loginData: {
              name: '',
              email: '',
              password: '',
            },
          });
        } else if (status === 'failed') {
          this.setState({
            message,
            show: true,
            alert: 1,
          });
        }
      });
    }
  }

  handleValidation(e) {
    const { value } = e.target;
    const password = document.querySelector('input[name="password"]').value;

    this.setState({ confirm: value === password });
  }

  setShow(value) {
    this.setState({ show: value });
  }

  render() {
    const { isLoggedIn } = this.props;
    const { isLoading, confirm, show, alert, message } = this.state;

    if (isLoggedIn) {
      return (
        <>
          <Header />

          <main className="auth register">
            <Container>
              <Row>
                <Col>
                  <Card>
                    <Card.Header>Registrar usuario</Card.Header>

                    <Card.Body>
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="name">
                          <Form.Label>Nombre</Form.Label>

                          <Form.Control
                            name="name"
                            type="text"
                            placeholder="Ingresa tu nombre"
                            onChange={this.handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="email">
                          <Form.Label>Correo</Form.Label>

                          <Form.Control
                            name="email"
                            type="email"
                            placeholder="Ingresa tu correo"
                            onChange={this.handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="password">
                          <Form.Label>Contraseña</Form.Label>

                          <Form.Control
                            className={`input-${confirm ? 'success' : 'danger'}`}
                            name="password"
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            onChange={this.handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="confirm">
                          <Form.Label>Confirmar contraseña</Form.Label>

                          <Form.Control
                            className={`input-${confirm ? 'success' : 'danger'}`}
                            name="confirm"
                            type="password"
                            placeholder="Vuelve a introducir la contraseña"
                            onChange={this.handleValidation}
                            required
                          />

                          <Form.Text className={`text-${confirm ? 'success' : 'danger'}`}>
                            {confirm ? '' : '¡Las contraseñas no coinciden!'}
                          </Form.Text>
                        </Form.Group>

                        <Alert show={show} variant={`${alert === 0 ? 'success' : 'danger'}`}>
                          <Alert.Heading>
                            {alert === 0
                              ? '¡Usuario registrado correctamente!'
                              : '¡Hubo un error al registrar al usuario!'}
                          </Alert.Heading>

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
                          Registrar usuario
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

    return <Redirect to="/" />;
  }
}

Register.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

export default connect(mapStateToProps, null)(Register);
