/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { Container, Col, Row } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../../sass/Search.scss';

function Search() {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const isTag = useQuery().get('isTag') === 'true';
  const searchParam = useQuery().get('searchParam');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    document.title = `Resultados de búsqueda | Juan Daniel Martínez`;

    axios.post('/api/blog/search', { isTag, searchParam }).then((response) => {
      setSearchResult(response.data);
    });
  }, []);

  return (
    <div className="serach">
      <Header />

      <Container>
        <Row>
          <Col>
            <h1 className="h1">{`Buscar: ${isTag ? '#' : ''}${searchParam}`}</h1>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default Search;
