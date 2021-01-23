import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';

const Post = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  axios.get(`/api/blog/${slug}`).then((response) => {
    const { title, body } = response.data;

    setTitle(title);
    setBody(body);
  });

  return (
    <div className="post-view">
      <Header />

      <Container>
        <Row>
          <Col>
            <h1>{title}</h1>

            <p>{body}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Post;
