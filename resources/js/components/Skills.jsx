/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import cssIcon from '../../svg/css-icon.svg';
import jsIcon from '../../svg/javascript-icon.svg';
import laravelIcon from '../../svg/laravel-icon.svg';
import gitIcon from '../../img/git.png';
import psIcon from '../../img/photoshop.png';
import aiIcon from '../../img/illustrator.png';
import figmaIcon from '../../img/figma.png';

import '../../sass/Skills.scss';

const coreSkills = [
  {
    id: 1,
    keyName: 'css',
    icon: cssIcon,
    title: 'CSS + Bootstrap 4',
    text:
      "Anteriormente todos mis proyetos habían sido diseñados con CSS puro, hasta que entré a proyectos más demandantes con los cuales tuve la necesidad de acudir a un framework como <span class='accent-text'>Bootstrap</span> para agilizar el trabajo y tener menos problemas en diseños responsivos.",
    position: 'center',
  },
  {
    id: 2,
    icon: jsIcon,
    keyName: 'javascript',
    title: 'Javascript + React',
    text:
      "Después de haber aprendido las bases de Javascript, me di a la tarea de empezar a crear todos mis proyectos con <span class='accent-text'>React</span>, una de las librerías más populares del momento para el diseño de interfaces.",
    position: 'start',
  },
  {
    id: 3,
    icon: laravelIcon,
    keyName: 'laravel',
    title: 'PHP + Laravel',
    text:
      "Desde que empecé en la programación Back-end lo hice con PHP, y posteriormente descubrí que en conjunto con el framework <span class='accent-text'>Laravel</span> se pueden llegar a hacer sistemas demasiado complejos y de manera más fácil.",
    position: 'end',
  },
];
const secondSkills = [
  { id: 1, name: 'git', icon: gitIcon },
  { id: 2, name: 'photoshop', icon: psIcon },
  { id: 3, name: 'illustrator', icon: aiIcon },
  { id: 4, name: 'figma', icon: figmaIcon },
];

const Skills = () => (
  <section id="skills" className="skills">
    <Container>
      <Row className="skillsCore">
        {coreSkills.map((item) => (
          <Col
            xs={12}
            key={`core-skill-${item.id}`}
            className={`d-flex justify-content-${item.position}`}
          >
            <div className={`skillsCore__card ${item.keyName}`}>
              <div className="skillsCore__card--icon d-flex justify-content-center align-items-center">
                <img src={item.icon} alt="Skill icon" />
              </div>

              <h3 className="skillsCore__card--title h3">{item.title}</h3>

              <p
                className="skillsCore__card--text text"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            </div>
          </Col>
        ))}
      </Row>
    </Container>

    <Container className="skillsSecond">
      <Row>
        <Col>
          <h2 className="skillsSecond--title h2">¡Eso no es todo!</h2>

          <p className="skillsSecond--text text">
            Al ser programador Full-stack me importa como lucen mis aplicaciones, por ello soy capaz
            de manejar herramientas que me permiten complementar el diseño de las mismas así como su
            control e implementación.
          </p>
        </Col>
      </Row>

      <Row className="skillsSecond__container">
        {secondSkills.map((item) => (
          <Col
            lg={3}
            md={6}
            xs={12}
            key={`second-skill-${item.id}`}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div className={`skillsSecond__container__item ${item.name}`}>
              <img src={item.icon} alt="Secondary skill icon" />

              <p className="skillsSecond__container__item--name">{item.name}</p>
            </div>
          </Col>
        ))}
      </Row>

      <Row>
        <Col
          lg={4}
          xs={12}
          className="skillSecond__counter d-flex align-items-center justify-content-center"
        >
          <p className="skillSecond__counter--count h2">338</p>

          <p className="skillSecond__counter--desc text">
            Tazas de café <span className="emoji">☕</span>
          </p>
        </Col>

        <Col
          lg={4}
          xs={12}
          className="skillSecond__counter d-flex align-items-center justify-content-center"
        >
          <p className="skillSecond__counter--count h2">190.4k+</p>

          <p className="skillSecond__counter--desc text">
            Líneas de código <span className="emoji">💻</span>
          </p>
        </Col>

        <Col
          lg={4}
          xs={12}
          className="skillSecond__counter d-flex align-items-center justify-content-center"
        >
          <p className="skillSecond__counter--count h2">4+</p>

          <p className="skillSecond__counter--desc text">
            Años de experiencia <span className="emoji">✅</span>
          </p>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Skills;
