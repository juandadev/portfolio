import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Container, Row, Col, Tab, Button, Nav, Badge, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Editor from '../components/Editor';

import '../../sass/Admin.scss';

class Admin extends Component {
  componentDidMount() {
    document.title = 'Panel de administración';
  }

  render() {
    const { isLoggedIn, posts, poststags, tags } = this.props;

    if (isLoggedIn) {
      return (
        <>
          <Header />

          <main className="admin">
            <Container>
              <Tab.Container id="left-tabs-example" defaultActiveKey="view">
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
                      <Tab.Pane eventKey="view">
                        {posts.map((post) => (
                          <Card key={`viewPost-${post.id}`} className="card-posts-view">
                            <Card.Body className="d-flex align-items-center justify-content-between">
                              <div className="viewPost-info d-flex align-items-center">
                                <p className="viewPost-title">{post.title}</p>

                                {poststags
                                  .filter((postTag) => postTag.post_id === post.id)
                                  .map((tag) => (
                                    <Badge variant="secondary" key={`viewPost-tag-${tag.id}`}>
                                      {tags.filter((tagName) => tagName.id === tag.id)[0].name}
                                    </Badge>
                                  ))}
                              </div>

                              <div className="controls">
                                <Button variant="primary">Editar</Button>

                                <Button variant="danger">Eliminar</Button>
                              </div>
                            </Card.Body>
                          </Card>
                        ))}
                      </Tab.Pane>

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
  posts: PropTypes.any.isRequired,
  poststags: PropTypes.any.isRequired,
  tags: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  posts: state.posts,
  poststags: state.poststags,
  tags: state.tags,
});

export default connect(mapStateToProps, null)(Admin);
