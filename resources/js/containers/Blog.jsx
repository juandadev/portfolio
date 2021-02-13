/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import axios from 'axios';

import { Container, Row, Col, Badge } from 'react-bootstrap';
import Header from '../components/Header';
import Card from '../components/BlogCard';

import '../../sass/Blog.scss';

class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      poststags: [],
      tags: [],
      tagCountList: [],
      featuredPostsList: [],
    };
  }

  componentDidMount() {
    document.title = 'Blog | Juan Daniel Martínez';

    axios
      .get('/api/post')
      .then((response) => this.initializeData(response.data))
      .catch((error) => console.error(error.message));
  }

  initializeData(data) {
    const tagCountList = data[2]
      .slice(0, 10)
      .map((tag) => ({
        name: tag.name,
        count: data[1].reduce((acc, postTag) => (postTag.tag_id === tag.id ? acc + 1 : acc), 0),
      }))
      .sort((a, b) => b.count - a.count);

    const featuredPostsList = data[0].slice(0, 4).sort((a, b) => b.views - a.views);

    this.setState({
      posts: data[0],
      poststags: data[1],
      tags: data[2],
      tagCountList,
      featuredPostsList,
    });
  }

  render() {
    const { posts, poststags, tags, tagCountList, featuredPostsList } = this.state;

    return (
      <div className="blog">
        <Header />

        <Container>
          <Row className="blog__head">
            <Col>
              <h1 className="h1">¡Bienvenido a mi mundo!</h1>

              <p className="text">Aquí es donde comparto un poco de mi conocimiento</p>

              <div className="blog__head--search d-flex justify-content-center">
                <input
                  type="text"
                  name="postSearch"
                  id="postSearch"
                  placeholder="Busca por post o #etiqueta"
                  autoComplete="off"
                />
              </div>

              <p className="text">También me puedes encontrar en:</p>

              <div className="blog__head__social">
                <div className="blog__head__social--dev">
                  <svg
                    width={40}
                    height={40}
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.725 15.7402C10.3786 15.4812 10.0312 15.3518 9.68482 15.3518H8.12768V24.6795H9.68571C10.0321 24.6795 10.3795 24.55 10.7259 24.2911C11.0723 24.0321 11.2455 23.6438 11.2455 23.125V16.9062C11.2446 16.3884 11.0705 15.9991 10.725 15.7402ZM36.0804 0H3.91964C1.75893 0 0.00535714 1.74911 0 3.91071V36.0893C0.00535714 38.2509 1.75893 40 3.91964 40H36.0804C38.242 40 39.9946 38.2509 40 36.0893V3.91071C39.9946 1.74911 38.2411 0 36.0804 0ZM13.7679 23.142C13.7679 24.8214 12.7312 27.3661 9.45 27.3607H5.30714V12.5875H9.5375C12.7018 12.5875 13.7661 15.1286 13.767 16.8089L13.7679 23.142ZM22.7571 15.2259H18V18.6562H20.908V21.2964H18V24.7259H22.758V27.3661H17.2063C16.2098 27.392 15.3813 26.6045 15.3563 25.608V14.4375C15.3321 13.442 16.1205 12.6152 17.1161 12.5902H22.758L22.7571 15.2259ZM32.0107 25.5196C30.8321 28.2652 28.7205 27.7188 27.775 25.5196L24.3348 12.5911H27.2429L29.8955 22.7446L32.5357 12.5911H35.4446L32.0107 25.5196Z"
                      fill="black"
                    />
                  </svg>
                </div>

                <div className="blog__head__social--medium">
                  <svg
                    width={40}
                    height={40}
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0V40H40V0H0ZM33.2321 9.47322L31.0893 11.5268C30.9018 11.6696 30.8125 11.9018 30.8482 12.125V27.2411C30.8125 27.4732 30.9018 27.7054 31.0893 27.8393L33.1875 29.8929V30.3482H22.6518V29.9107L24.8214 27.8036C25.0357 27.5893 25.0357 27.5268 25.0357 27.2054V14.9821L19 30.3036H18.1875L11.1607 14.9821V25.25C11.0982 25.6786 11.25 26.1161 11.5536 26.4286L14.375 29.8482V30.3036H6.35714V29.8482L9.17857 26.4286C9.48214 26.1161 9.61607 25.6786 9.54464 25.25V13.375C9.58036 13.0446 9.45536 12.7232 9.20536 12.5L6.69643 9.47322V9.01786H14.4911L20.5089 22.2321L25.8036 9.02679H33.2321V9.47322Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="blog__tags">
            <Col>
              <h2 className="h2">Temas populares</h2>

              <div className="blog__tags__container">
                {tagCountList.map((tag, index) => (
                  <Badge key={`popular-tag-${index}`} variant="secondary">{`#${tag.name}`}</Badge>
                ))}
              </div>
            </Col>
          </Row>

          <Row className="blog__featured">
            <Col xs={12}>
              <h2 className="h2">Destacados</h2>
            </Col>

            <Col lg={12} sm={6} xs={12}>
              <div className="blog__featured__container">
                {featuredPostsList.length !== 0 ? (
                  <Card
                    type="popular"
                    title={featuredPostsList[0].title.toString()}
                    cover={featuredPostsList[0].cover.toString()}
                    tags={poststags
                      .filter((postTag) => postTag.post_id === featuredPostsList[0].id)
                      .map((tag) => ({
                        name: tags.filter((tagName) => tagName.id === tag.tag_id)[0].name,
                      }))}
                    body={featuredPostsList[0].body.toString()}
                    created_at={featuredPostsList[0].created_at.toString()}
                  />
                ) : (
                  ''
                )}
              </div>
            </Col>

            {featuredPostsList.length !== 0
              ? featuredPostsList.slice(1, 4).map((featuredPost) => (
                  <Col key={`featured-post-${featuredPost.id}`} lg={4} sm={6} xs={12}>
                    <Card
                      type="featured"
                      title={featuredPost.title}
                      cover={featuredPost.cover}
                      tags={poststags
                        .filter((postTag) => postTag.post_id === featuredPost.id)
                        .map((tag) => ({
                          name: tags.filter((tagName) => tagName.id === tag.tag_id)[0].name,
                        }))}
                      body={featuredPost.body}
                      created_at={featuredPost.created_at}
                    />
                  </Col>
                ))
              : ''}
          </Row>

          <Row className="blog__recent">
            <Col xs={12}>
              <h2 className="h2">Recientes</h2>
            </Col>

            {posts.length !== 0
              ? posts
                  .filter(
                    (post) =>
                      post.id !== featuredPostsList[0].id &&
                      post.id !== featuredPostsList[1].id &&
                      post.id !== featuredPostsList[2].id &&
                      post.id !== featuredPostsList[3].id,
                  )
                  .map((recentPost) => (
                    <Col key={`recent-post-${recentPost.id}`} lg={4}>
                      <Card
                        type="recent"
                        title={recentPost.title}
                        cover={recentPost.cover}
                        tags={poststags
                          .filter((postTag) => postTag.post_id === recentPost.id)
                          .map((tag) => ({
                            name: tags.filter((tagName) => tagName.id === tag.tag_id)[0].name,
                          }))}
                        body={recentPost.body}
                        created_at={recentPost.created_at}
                      />
                    </Col>
                  ))
              : ''}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Blog;
