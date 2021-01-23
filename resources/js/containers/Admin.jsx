/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import axios from 'axios';

import { Container, Row, Col, Tab, Button, Nav, Badge, Card, Modal, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Editor from '../components/Editor';

import '../../sass/Admin.scss';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      title: '',
      body: '',
      postTags: [],
      show: false,
      alert: false,
      status: 'success',
      message: '',
      tab: 'view',
      edit: { disabled: 'disabled' },
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    document.title = 'Panel de administración';
  }

  handleClose() {
    this.setState({
      id: 0,
      title: '',
      show: false,
    });
  }

  handleDelete() {
    const { id } = this.state;

    axios({
      method: 'POST',
      url: `/api/post/${id}`,
      data: { _method: 'DELETE' },
    })
      .then((response) => {
        const { status, message } = response.data;

        if (status === 200) {
          this.setState({
            show: false,
            alert: true,
            status: 'success',
            message,
          });
        }
      })
      .catch((error) =>
        this.setState({ show: false, alert: true, status: 'danger', message: error.message }),
      );
  }

  render() {
    const { show, title, alert, message, status, tab, edit, body, postTags, id } = this.state;
    const { isLoggedIn, posts, poststags, tags } = this.props;

    if (isLoggedIn) {
      return (
        <>
          {/* TODO: Create all CRUD operations with redux */}
          <Header />

          <main className="admin">
            <Container>
              <Tab.Container id="left-tabs-example" defaultActiveKey="view" activeKey={tab}>
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link
                          eventKey="view"
                          onClick={() =>
                            this.setState({ tab: 'view', edit: { disabled: 'disabled' } })
                          }
                        >
                          Ver posts
                        </Nav.Link>
                      </Nav.Item>

                      <Nav.Item>
                        <Nav.Link
                          eventKey="new"
                          onClick={() =>
                            this.setState({ tab: 'new', edit: { disabled: 'disabled' } })
                          }
                        >
                          Nuevo post
                        </Nav.Link>
                      </Nav.Item>

                      <Nav.Item>
                        <Nav.Link eventKey="edit" {...edit}>
                          Editar post
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>

                  <Col sm={9}>
                    <Tab.Content>
                      <Alert show={alert} variant={status}>
                        <Alert.Heading>
                          {status === 'succes'
                            ? '¡Post eliminado con éxito!'
                            : '¡Hubo un error al eliminar el post!'}
                        </Alert.Heading>

                        <p>{message}</p>

                        <hr />

                        <div className="d-flex justify-content-end">
                          <Button
                            onClick={() => this.setState({ alert: false })}
                            variant={`outline-${status}`}
                          >
                            Cerrar
                          </Button>
                        </div>
                      </Alert>

                      <Tab.Pane eventKey="view">
                        {posts.map((post) => (
                          <Card key={`viewPost-${post.id}`} className="card-posts-view">
                            <Card.Body className="d-flex align-items-center justify-content-between">
                              <div className="viewPost-info d-flex align-items-center">
                                <p
                                  className="viewPost-title"
                                  onClick={() => (window.location.href = `/blog/${post.slug}`)}
                                >
                                  {post.title}
                                </p>

                                {poststags
                                  .filter((postTag) => postTag.post_id === post.id)
                                  .map((tag) => (
                                    <Badge variant="secondary" key={`viewPost-tag-${tag.id}`}>
                                      {tags.filter((tagName) => tagName.id === tag.tag_id)[0].name}
                                    </Badge>
                                  ))}
                              </div>

                              <div className="controls">
                                {/* TODO: Creating the edit and delete functions */}
                                <Button
                                  variant="primary"
                                  onClick={() =>
                                    this.setState({
                                      id: post.id,
                                      title: post.title,
                                      body: post.body,
                                      postTags: [
                                        ...poststags
                                          .filter((postTag) => postTag.post_id === post.id)
                                          .map((tag) =>
                                            tags.filter((tagName) => tagName.id === tag.tag_id),
                                          ),
                                      ],
                                      edit: { disabled: '' },
                                      tab: 'edit',
                                    })
                                  }
                                >
                                  Editar
                                </Button>

                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    this.setState({ id: post.id, title: post.title, show: true })
                                  }
                                >
                                  Eliminar
                                </Button>

                                <Modal
                                  show={show}
                                  onHide={this.handleClose}
                                  backdrop="static"
                                  keyboard={false}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>Confirmar eliminación</Modal.Title>
                                  </Modal.Header>

                                  <Modal.Body>
                                    ¿Estás seguro que deseas eliminar el post{' '}
                                    <strong>{title}</strong>
                                  </Modal.Body>

                                  <Modal.Footer>
                                    <Button variant="danger" onClick={this.handleDelete}>
                                      Eliminar
                                    </Button>

                                    <Button variant="secondary" onClick={this.handleClose}>
                                      Cancelar
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </div>
                            </Card.Body>
                          </Card>
                        ))}
                      </Tab.Pane>

                      <Tab.Pane eventKey="new">
                        <Editor cardTitle="Nuevo post" path="/api/post" method="POST" />
                      </Tab.Pane>

                      <Tab.Pane eventKey="edit">
                        {tab === 'edit' ? (
                          <Editor
                            cardTitle="Editar post"
                            setTitle={title}
                            setBody={body}
                            setTags={postTags}
                            path={`/api/post/${id}`}
                            method="PUT"
                          />
                        ) : (
                          ''
                        )}
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
  posts: PropTypes.array.isRequired,
  poststags: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  posts: state.posts,
  poststags: state.poststags,
  tags: state.tags,
});

export default connect(mapStateToProps, null)(Admin);
