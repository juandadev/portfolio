/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import '../../sass/BlogCard.scss';

const BlogCard = (props) => {
  const { type, cover, title, tags, body, created_at } = props;

  const parseDate = (created_at) => {
    const date = new Date(created_at);
    const twoDigitDate = (value) => (value < 10 ? `0${value}` : value);

    return `${twoDigitDate(date.getDate())}/${twoDigitDate(
      date.getMonth() + 1,
    )}/${date.getFullYear()}`;
  };

  return (
    <div className={`blog-card card-${type}`}>
      <div className="blog-card__cover">
        <img
          src={`/storage/${cover}`}
          alt={`Portada del post "${title}"`}
          title={`Portada del post "${title}"`}
        />
      </div>

      <div className="blog-card--gradient" />

      <div className="blog-card__info d-flex flex-column justify-content-between">
        <div className="blog-card__info__head">
          <h3 className="blog-card__info__head--title">{title}</h3>

          <p className="blog-card__info__head--tags">{tags.map((tag) => `#${tag.name}, `)}</p>
        </div>

        <p className="blog-card__info--desc">
          {type === 'desktop-popular' ? `${body.slice(0, 440)}...` : `${body.slice(0, 530)}...`}
        </p>

        <p className="blog-card__info--date">{parseDate(created_at)}</p>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  body: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
};

export default BlogCard;
