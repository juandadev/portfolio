/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';

import heroIllustration from '../../svg/hero-illustration.svg';

import '../../sass/Hero.scss';

const Hero = () => (
  <section id="hero" className="hero">
    <Container>
      <Row>
        <Col lg={6} xs={12} className="hero__info d-flex flex-column justify-content-center">
          <h1 className="hero__info--title h1">Juan Daniel Martínez</h1>

          <h2 className="hero__info--subtitle">Apasionado Desarrollador Web</h2>

          <p className="hero__info--desc text">
            Hola <span className="emoji">👋</span>, me gusta programar páginas web, pero también me
            importa que mis usuarios tengan una buena experiencia, ¿Empezamos ya?
          </p>

          <Button
            type="primary"
            href="http://bit.ly/wp-juanda"
            className="hero__info--btn align-self-center"
          >
            ¡Hablemos!
          </Button>
        </Col>

        <Col
          lg={6}
          xs={12}
          className="hero__img d-flex align-items-center justify-content-center"
          onDoubleClick={() => (window.location.href = '/login')}
        >
          <img src={heroIllustration} alt="Hero illustration" />
        </Col>
      </Row>
    </Container>
  </section>
);

export default Hero;
