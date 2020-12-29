import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import cssIcon from '../../svg/css-icon.svg';
import cssImage from '../../svg/css-illustration.svg';
import jsIcon from '../../svg/javascript-icon.svg';
import jsImage from '../../svg/javascript-illustration.svg';
import laravelIcon from '../../svg/laravel-icon.svg';
import laravelImage from '../../svg/laravel-illustration.svg';

import '../../sass/Skills.scss';

const coreSkills = [
  {
    id: 1,
    keyName: 'css',
    icon: cssIcon,
    title: 'CSS + Bootstrap 4',
    text:
      "Anteriormente todos mis proyetos habían sido diseñados con CSS puro, hasta que entré a proyectos más demandantes con los cuales tuve la necesidad de acudir a un framework como <span class='accent-text'>Bootstrap</span> para agilizar el trabajo y tener menos problemas en diseños responsivos.",
    image: cssImage,
    position: 'center',
  },
  {
    id: 2,
    icon: jsIcon,
    keyName: 'javascript',
    title: 'Javascript + React',
    text:
      "Después de haber aprendido las bases de Javascript, me di a la tarea de empezar a crear todos mis proyectos con <span class='accent-text'>React</span>, una de las librerías más populares del momento para el diseño de interfaces.",
    image: jsImage,
    position: 'start',
  },
  {
    id: 3,
    icon: laravelIcon,
    keyName: 'laravel',
    title: 'PHP + Laravel',
    text:
      "Desde que empecé en la programación backend lo hice con PHP, y posteriormente descubrí que en conjunto con el framework <span class='accent-text'>Laravel</span> se pueden llegar a hacer sistemas demasiado complejos y de manera más fácil.",
    image: laravelImage,
    position: 'end',
  },
];

const Skills = () => (
  <section id="skills" className="skills">
    <Container>
      <Row className="skills__core">
        {coreSkills.map((item) => (
          <Col
            xs={12}
            key={`core-skill-${item.id}`}
            className={`d-flex justify-content-${item.position}`}
          >
            <div className={`skills__core__card ${item.keyName}`}>
              <div className="skills__core__card--icon d-flex justify-content-center align-items-center">
                <img src={item.icon} alt="Skill icon" />
              </div>

              <h3 className="skills__core__card--title h3">{item.title}</h3>

              <p
                className="skills__core__card--text text"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

export default Skills;
