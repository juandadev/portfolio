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
      <Header color={color} />

      <Container>
        <Row className="post-head">
          <Col>
            <div className="post-head__tags">
              <p>
                {poststags
                  .filter((postTag) => postTag.post_id === id)
                  .map(
                    (tag) => `#${tags.filter((tagName) => tagName.id === tag.tag_id)[0].name}, `,
                  )}
              </p>
            </div>

            <h1 className="post-head__title">{title}</h1>
            {/* TODO: Parse date to dd/mm/aaaa format */}
            <p className="post-head__author">
              Por {author} | {date.replace(/-/g, '/')}
            </p>
          </Col>
        </Row>

        <Row className="post-cover">
          <Col xs={10}>
            <img src={`/storage/${cover}`} alt="Post cover" />
          </Col>
        </Row>

        <div className="post-bg" style={{ backgroundColor: color }} />

        <Row>
          <Col>
            <div className="post-content">
              <div className="post-content__body" dangerouslySetInnerHTML={getRawMarkup()} />
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
