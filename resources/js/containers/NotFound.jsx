import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function NotFound() {
  return (
    <>
      <Header />

      <Container>
        <h1>404 Not Found</h1>
      </Container>

      <Footer />
    </>
  );
}
