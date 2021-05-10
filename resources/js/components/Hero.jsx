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

          <h2 className="hero__info--subtitle">Diseñador y Desarrollador Web Full-Stack</h2>

          <p className="hero__info--desc text">
            Bienvenido! <span className="emoji">👋</span> este es mi espacio y espero disfrutes tu
            estancia en este sitio, te mostraré un poco de lo que hago día a día ¿Me acompañas?
          </p>

          <Button type="primary" href="#skills" className="hero__info--btn align-self-center">
            ¡Vamos!
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
