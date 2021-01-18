/* eslint-disable import/no-duplicates */
import React, { Component } from 'react';

import { Card, Button, Form, Tabs, Tab } from 'react-bootstrap';
import remarkableReactCjs from 'remarkable-react';
import Remarkable from 'remarkable-react';
import RemarkableReactRenderer from 'remarkable-react';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '**Hola** compas',
      tags: [],
      author: '',
    };

    this.md = new Remarkable();

    this.handleChange = this.handleChange.bind(this);
    this.getRawMarkup = this.getRawMarkup.bind(this);
  }

  handleChange(e) {
    const { value, name } = e.target;
    const data = {};

    data[name] = value;

    this.setState(data);
  }

  getRawMarkup() {
    const { body } = this.state;

    // return { __html: this.md.render(body) };
  }

  render() {
    const { body } = this.state;

    return (
      <Card>
        <Card.Header>Nuevo post</Card.Header>

        <Card.Body>
          <Tabs defaultActiveKey="post" id="uncontrolled-tab-example">
            <Tab eventKey="post" title="Editor">
              <Form>
                <Form.Group controlId="title">
                  <Form.Label>Título</Form.Label>

                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Título del post"
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="body">
                  <Form.Label>Contenido</Form.Label>

                  <Form.Control
                    as="textarea"
                    name="body"
                    rows={3}
                    placeholder="Empieza a escribir aquí"
                    defaultValue={body}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form>
            </Tab>

            <Tab eventKey="preview" title="Vista previa">
              <div className="post-preview" dangerouslySetInnerHTML={this.getRawMarkup()} />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    );
  }
}

export default Editor;
