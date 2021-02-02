/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Remarkable } from 'remarkable';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Container, Row, Col, Badge } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../../sass/Post.scss';

const Post = (props) => {
  const md = new Remarkable();
  const { slug } = useParams();
  const { tags, poststags } = props;
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [cover, setCover] = useState('');
  const [color, setColor] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');

  axios.get(`/api/blog/${slug}`).then((response) => {
    const { id, title, cover, color, body, author, created_at } = response.data;

    setId(id);
    setTitle(title);
    setCover(cover);
    setColor(color);
    setBody(body);
    setAuthor(author);
    setDate(created_at.slice(0, 10));
  });

  function getRawMarkup() {
    return { __html: md.render(body) };
  }

  return (
    <div className="post-view">
      <Header />

      <Container>
        <Row>
          <Col>
            <div className="post">
              <h1 className="post-title" style={{ color }}>
                {title}
              </h1>

              <img src={`/storage/${cover}`} alt="Post cover" style={{ width: '100%' }} />

              <p className="author">
                Por {author} | {date.replace(/-/g, '/')}
              </p>

              <div className="tags">
                {poststags
                  .filter((postTag) => postTag.post_id === id)
                  .map((tag) => (
                    <Badge variant="secondary" key={`viewPost-tag-${tag.id}`}>
                      {tags.filter((tagName) => tagName.id === tag.tag_id)[0].name}
                    </Badge>
                  ))}
              </div>

              <div className="post-view__body post" dangerouslySetInnerHTML={getRawMarkup()} />
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

Post.propTypes = {
  tags: PropTypes.array.isRequired,
  poststags: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  tags: state.tags,
  poststags: state.poststags,
});

export default connect(mapStateToProps, null)(Post);
