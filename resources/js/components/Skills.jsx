/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import pencilIcon from '../../svg/pencil.svg';
import layersIcon from '../../svg/layers.svg';
import bulbIcon from '../../svg/bulb.svg';

import '../../sass/Skills.scss';

const coreSkills = [
  {
    id: 1,
    keyName: 'css',
    icon: pencilIcon,
    title: 'Diseñador',
    text:
      "Soy <span class='accent-text'>Ingeniero en Sistemas Computacionales</span> egresado del <span class='accent-text'>Tecnológico de Parral</span>, y aún así desde siempre me he interesado por el diseño gráfico. He desarrollado a lo largo de los años estas habilidades que se complementan perfectamente con mi trabajo como desarrollador web.",
    position: 'center',
  },
  {
    id: 2,
    icon: layersIcon,
    keyName: 'javascript',
    title: 'Desarrollador web',
    text:
      'Mi enfoque es en desarrollar aplicaciones web completas y funcionales, abarcando todas las tecnologías necesarias para completar el stack de desarrollo según sean las necesidades de mis proyectos.',
    position: 'start',
  },
  {
    id: 3,
    icon: bulbIcon,
    keyName: 'laravel',
    title: 'Nunca parar',
    text:
      'El futuro está en el internet, y como tal las tecnologías se van actualizando para mejorarnos la vida, por eso aquí es bienvenido cualquier reto, me sigo preparando para mejorar mis skills como desarrollador y como profesionista.',
    position: 'end',
  },
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
  </section>
);

export default Skills;
