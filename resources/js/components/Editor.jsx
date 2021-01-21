/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  Card,
  Button,
  Form,
  Tabs,
  Tab,
  InputGroup,
  Badge,
  Navbar,
  Container,
  Alert,
  ProgressBar,
  Row,
  Col,
  Collapse,
} from 'react-bootstrap';
import { Remarkable } from 'remarkable';

import '../../sass/Editor.scss';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      tags: [],
      tagValue: '',
      tagHover: 0,
      tagStatus: true,
      alert: false,
      status: 'success',
      message: '',
      preview: { disabled: 'disabled' },
      author: 'Juan Daniel Martínez',
      uploadProgress: 0,
      isLoading: false,
      open: false,
      options: [],
    };

    this.md = new Remarkable();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.deleteTags = this.deleteTags.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    const { value, name } = e.target;
    const { tags } = this.props;
    const data = {};

    data[name] = value;

    this.setState(data);

    if (name === 'tagValue') {
      const options = tags.filter((tag) => tag.name.includes(value));

      this.setState({
        options: options.slice(0, 5),
      });
    }

    setTimeout(() => {
      this.handleValidation();
    }, 100);
  }

  handleTags(e) {
    // TODO: Avoid accents in tags
    // TODO: Suggestions searching a tag that already exists
    const { tags } = this.state;
    const { value } = e.target;
    const current = tags.length + 1;

    if (e.key === 'Enter' && value !== '') {
      this.setState({
        tags: [
          ...tags,
          {
            id: current,
            name: value.toLowerCase(),
          },
        ],
        tagValue: '',
        tagStatus: true,
        open: false,
      });
    } else {
      this.setState({ tagStatus: false });
    }

    if (e.key !== 'Enter' || value !== '') {
      this.setState({ tagStatus: true });
    }
  }

  handleClick(value) {
    const { tags } = this.state;
    const current = tags.length + 1;

    this.setState({
      tags: [
        ...tags,
        {
          id: current,
          name: value.toLowerCase(),
        },
      ],
      tagValue: '',
      tagStatus: true,
    });
  }

  handleValidation() {
    const { title, body } = this.state;

    if (title === '' || body === '') {
      this.setState({ preview: { disabled: 'disabled' } });
    } else {
      this.setState({ preview: { disabled: '' } });
    }
  }

  handleSubmit() {
    const { title, body, author, tags } = this.state;

    const data = {
      title,
      body,
      status: 'active',
      author: author.toLowerCase(),
      tags,
    };

    axios
      .post('/api/post', data, {
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded / e.total) * 100);

          this.setState({
            uploadProgress: progress,
            isLoading: true,
          });
        },
      })
      .then((response) => {
        const { status, message } = response;

        if (status === 200) {
          this.setState({
            title: '',
            body: '',
            tags: [],
            alert: true,
            status: 'success',
            message,
            isLoading: false,
          });
        } else {
          this.setState({
            alert: true,
            status: 'warning',
            message: message.toString(),
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          alert: true,
          status: 'danger',
          message: error.message,
          isLoading: false,
        });
      });
  }

  getRawMarkup() {
    const { body } = this.state;

    return { __html: this.md.render(body) };
  }

  deleteTags(key) {
    const { tags } = this.state;

    const newTags = tags.filter((item) => item.id !== key);

    this.setState({
      tags: [...newTags],
    });
  }

  render() {
    const {
      body,
      title,
      tags,
      author,
      tagValue,
      tagHover,
      tagStatus,
      alert,
      status,
      message,
      preview,
      uploadProgress,
      isLoading,
      open,
      options,
    } = this.state;

    return (
      <Card className="editor">
        <Card.Header>Nuevo post</Card.Header>

        <Card.Body>
          <Tabs defaultActiveKey="post" id="uncontrolled-tab-example">
            <Tab eventKey="post" title="Editor">
              <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group controlId="title">
                  <Form.Label>Título</Form.Label>

                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Título del post"
                    value={title}
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Etiquetas</InputGroup.Text>
                  </InputGroup.Prepend>

                  <Form.Control
                    className={tagStatus ? '' : 'is-invalid'}
                    placeholder="Escribe las etiquetas del post"
                    name="tagValue"
                    aria-label="tags"
                    aria-describedby="basic-addon1"
                    onKeyPress={this.handleTags}
                    onChange={this.handleChange}
                    onFocus={() => this.setState({ open: true })}
                    onBlur={() => {
                      setTimeout(() => {
                        this.setState({ open: false });
                      }, 200);
                    }}
                    value={tagValue}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    autoComplete="off"
                  />

                  <Collapse in={open}>
                    {options ? (
                      <div id="example-collapse-text" className="dropdown-menu">
                        {options.map((option) => (
                          // eslint-disable-next-line react/jsx-indent
                          <div
                            key={`autocomplete-tag-${option.id}`}
                            className="dropdown-item"
                            onClick={() => this.handleClick(option.name)}
                          >
                            {option.name}
                          </div>
                        ))}
                      </div>
                    ) : (
                      ''
                    )}
                  </Collapse>
                </InputGroup>

                {tagStatus ? (
                  ''
                ) : (
                  <Form.Text className="text-danger">¡Debes agregar una etiqueta válida!</Form.Text>
                )}

                <Form.Group>
                  {tags.map((item) => (
                    <Badge
                      variant={tagHover === item.id ? 'danger' : 'secondary'}
                      key={`tag-${item.id}`}
                      onClick={() => this.deleteTags(item.id)}
                      onMouseEnter={() => this.setState({ tagHover: item.id })}
                      onMouseLeave={() => this.setState({ tagHover: 0 })}
                    >
                      #{item.name}
                    </Badge>
                  ))}
                </Form.Group>

                <Form.Group controlId="body">
                  <Form.Label>Contenido</Form.Label>

                  <Form.Control
                    className="editor-txt"
                    as="textarea"
                    name="body"
                    rows={20}
                    placeholder="Empieza a escribir aquí"
                    value={body}
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Autor</InputGroup.Text>
                  </InputGroup.Prepend>

                  <Form.Control
                    placeholder="Autor del post"
                    name="author"
                    aria-label="author"
                    aria-describedby="basic-addon1"
                    onChange={this.handleChange}
                    value={author}
                  />
                </InputGroup>
              </Form>
            </Tab>

            <Tab eventKey="preview" title="Vista previa" {...preview}>
              <div className="post">
                <h1 className="post-title">{title}</h1>

                <p className="author">Por {author}</p>

                <div className="tags">
                  {tags.map((item) => (
                    <Badge
                      variant={tagHover === item.id ? 'danger' : 'secondary'}
                      key={`prevTag-${item.id}`}
                    >
                      #{item.name}
                    </Badge>
                  ))}
                </div>

                <div className="post-preview" dangerouslySetInnerHTML={this.getRawMarkup()} />
              </div>
            </Tab>
          </Tabs>

          <Alert show={alert} variant={status}>
            <Alert.Heading>
              {status === 'success' ? '¡Post subido con éxito!' : '¡Error al subir el post!'}
            </Alert.Heading>

            <p>{message}</p>

            <hr />

            <div className="d-flex justify-content-end">
              <Button onClick={() => this.setState({ alert: false })} variant={`outline-${status}`}>
                Cerrar
              </Button>
            </div>
          </Alert>
        </Card.Body>

        <Navbar fixed="bottom">
          <Container>
            <Row>
              <Col xs={3}>
                <Button onClick={this.handleSubmit}>Subir post</Button>
              </Col>

              <Col xs={9}>
                {isLoading ? (
                  <ProgressBar animated label={`%${uploadProgress}`} now={uploadProgress} />
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </Container>
        </Navbar>
      </Card>
    );
  }
}

Editor.propTypes = {
  tags: PropTypes.array.isRequired,
};

const mapDispatchToProps = (state) => ({
  tags: state.tags,
});

export default connect(mapDispatchToProps, null)(Editor);
