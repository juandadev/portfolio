/* eslint-disable react/jsx-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Remarkable } from 'remarkable';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Container, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
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
  const [hover, setHover] = useState(false);
  const [toolTipText, setToolTipText] = useState('');

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

  useEffect(() => {
    document.title = `${title} | Juan Daniel Martínez`;
  });

  const getRawMarkup = () => ({ __html: md.render(body) });

  const renderTooltip = (props) => (
    <Tooltip id="share-tooltip" {...props}>
      {toolTipText}
    </Tooltip>
  );

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

        <Row className="post-comments">
          <Col>
            <div
              className="fb-comments"
              data-href={`https://juanda.dev/blog/${slug}`}
              data-width="100%"
              data-numposts={5}
            />
          </Col>
        </Row>
      </Container>

      <OverlayTrigger placement="left" delay={{ show: 300, hide: 0 }} overlay={renderTooltip}>
        <Button
          variant="share"
          className="share-main"
          style={{ backgroundColor: color }}
          onMouseEnter={() => setToolTipText('Compartir')}
          onClick={() => setHover(!hover)}
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.20005 12L13.6 12M17.6 6.40005L13.6 11.9927L17.6 17.6M23.2 3.99796C23.2 5.76321 21.7664 7.19588 20 7.19588C18.2336 7.19588 16.8 5.76321 16.8 3.99796C16.8 2.23271 18.2336 0.800049 20 0.800049C21.7664 0.800049 23.2 2.23271 23.2 3.99796ZM23.2 19.9875C23.2 21.7528 21.7664 23.1854 20 23.1854C18.2336 23.1854 16.8 21.7528 16.8 19.9875C16.8 18.2223 18.2336 16.7896 20 16.7896C21.7664 16.7896 23.2 18.2223 23.2 19.9875ZM7.20005 11.9927C7.20005 13.758 5.76645 15.1907 4.00005 15.1907C2.23365 15.1907 0.800049 13.758 0.800049 11.9927C0.800049 10.2275 2.23365 8.79482 4.00005 8.79482C5.76645 8.79482 7.20005 10.2275 7.20005 11.9927Z"
              stroke="#ffffff"
              strokeOpacity="0.87"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </Button>
      </OverlayTrigger>

      <OverlayTrigger placement="left" delay={{ show: 250, hide: 0 }} overlay={renderTooltip}>
        <Button
          variant="share"
          className={`share-facebook ${hover ? 'up-10' : ''}`}
          style={{ backgroundColor: color }}
          onMouseEnter={() => setToolTipText('Facebook')}
          onClick={() =>
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fjuanda.dev%2Fblog%2F${slug}&amp;src=sdkpreparse`,
              '_blank',
            )
          }
        >
          <svg
            width={23}
            height={24}
            viewBox="0 0 23 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3959 22.4533C5.62268 22.4533 0.942566 17.7732 0.942566 12C0.942566 6.22678 5.62268 1.54666 11.3959 1.54666C17.1691 1.54666 21.8492 6.22678 21.8492 12C21.8492 17.7732 17.1691 22.4533 11.3959 22.4533ZM11.3959 22.4533V10.5067C11.3959 8.85717 12.7331 7.51999 14.3826 7.51999H15.1292M7.66257 13.4933H15.1292"
              stroke="white"
            />
          </svg>
        </Button>
      </OverlayTrigger>

      <OverlayTrigger placement="left" delay={{ show: 250, hide: 0 }} overlay={renderTooltip}>
        <Button
          variant="share"
          className={`share-twitter ${hover ? 'up-6' : ''}`}
          style={{ backgroundColor: color }}
          onMouseEnter={() => setToolTipText('Twitter')}
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?text=https%3A%2F%2Fjuanda.dev%2Fblog%2F${slug}&amp`,
              '_blank',
            )
          }
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.4169 3.03998L22.9158 3.0069C22.9025 2.80633 22.7704 2.63322 22.5805 2.56748C22.3905 2.50173 22.1797 2.55614 22.0452 2.70557L22.4169 3.03998ZM21.4259 7.45861C21.4259 7.18247 21.2021 6.95861 20.9259 6.95861C20.6498 6.95861 20.4259 7.18247 20.4259 7.45861H21.4259ZM11.9797 7.58135H11.4797H11.9797ZM11.9797 9.01331L12.4797 9.01331V9.01331L11.9797 9.01331ZM1.54254 19.4666V18.9666C1.32227 18.9666 1.12795 19.1108 1.06405 19.3216C1.00014 19.5324 1.08171 19.7602 1.26489 19.8825L1.54254 19.4666ZM3.03357 3.03998L3.50182 2.86465C3.43206 2.67832 3.25845 2.55108 3.05975 2.54066C2.86105 2.53025 2.67509 2.63863 2.58622 2.81665L3.03357 3.03998ZM8.99768 16.48L9.35151 16.8333C9.47387 16.7107 9.52411 16.5336 9.48429 16.365C9.44448 16.1965 9.32028 16.0605 9.15602 16.0057L8.99768 16.48ZM19.7852 4.49356L19.4143 4.8289L19.5945 5.02815L19.8601 4.98792L19.7852 4.49356ZM21.918 3.07306C21.9959 4.24697 21.9268 4.9917 21.7219 5.56935C21.5206 6.13656 21.1708 6.59285 20.58 7.15897L21.2718 7.88099C21.9132 7.26646 22.3883 6.68179 22.6643 5.90368C22.9366 5.13602 22.997 4.23107 22.9158 3.0069L21.918 3.07306ZM21.4259 8.54663V7.45861H20.4259V8.54663H21.4259ZM11.4797 7.58135L11.4797 9.01331L12.4797 9.01331L12.4797 7.58135L11.4797 7.58135ZM11.4797 9.01331L11.4797 9.75998L12.4797 9.75998L12.4797 9.01331L11.4797 9.01331ZM16.5141 2.53998C13.733 2.53998 11.4797 4.7978 11.4797 7.58135H12.4797C12.4797 5.34863 14.2867 3.53998 16.5141 3.53998V2.53998ZM20.4259 8.54663C20.4259 15.1269 15.1 20.46 8.53173 20.46V21.46C15.6537 21.46 21.4259 15.6777 21.4259 8.54663H20.4259ZM2.56532 3.2153C3.35498 5.32432 6.33155 9.51331 11.9797 9.51331V8.51331C6.89253 8.51331 4.20319 4.73786 3.50182 2.86465L2.56532 3.2153ZM2.58622 2.81665C1.04692 5.9 0.824074 8.85859 1.92347 11.3611C3.02114 13.8596 5.39309 15.8037 8.83935 16.9542L9.15602 16.0057C5.89265 14.9162 3.79152 13.127 2.83902 10.9589C1.88825 8.7947 2.03816 6.15329 3.48092 3.26331L2.58622 2.81665ZM8.64386 16.1267C7.71337 17.0586 4.95081 18.9666 1.54254 18.9666V19.9666C5.29121 19.9666 8.29399 17.8924 9.35151 16.8333L8.64386 16.1267ZM20.1561 4.15822C19.2581 3.16514 17.9587 2.53998 16.5141 2.53998V3.53998C17.6641 3.53998 18.6978 4.03644 19.4143 4.8289L20.1561 4.15822ZM19.8601 4.98792C20.9371 4.8248 21.9941 4.25761 22.7887 3.37438L22.0452 2.70557C21.3994 3.42341 20.5495 3.87209 19.7103 3.9992L19.8601 4.98792ZM1.26489 19.8825C3.64444 21.4713 6.13889 21.46 8.53173 21.46V20.46C6.10585 20.46 3.91373 20.4487 1.82019 19.0508L1.26489 19.8825Z"
              fill="white"
            />
          </svg>
        </Button>
      </OverlayTrigger>

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
