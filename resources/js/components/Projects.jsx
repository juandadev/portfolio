import React, { useState } from 'react';

import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';

import githubIcon from '../../svg/github.svg';
import flamewarsImg from '../../img/projects/flamewars.png';
import compudramImg from '../../img/projects/compudram.png';
import cuervoImg from '../../img/projects/cuervonutrition.png';
import styleGuideImg from '../../img/projects/styleguide.png';
import portfolioImg from '../../img/projects/portfolio.png';
import jobsImg from '../../img/projects/jobs.png';
import when2meetImg from '../../img/projects/when2meet.png';

import '../../sass/Projects.scss';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'When2Meet',
      langs: ['Bootstrap', 'React', 'Firebase'],
      desc: 'Planificador de eventos',
      image: when2meetImg,
      webLink: 'http://bit.ly/project-when2meet',
      repoLink: 'https://github.com/juandadev/when2meet-clone',
      color: 'rgba(254, 183, 46, 0.07)',
      btn: 'rgba(254, 183, 46, 1)',
    },
    {
      id: 2,
      title: 'Flamewars',
      langs: ['Bootstrap', 'Next.js', 'Express.js', 'Socket.io'],
      desc: 'Guerra de votos en tiempo real',
      image: flamewarsImg,
      webLink: 'http://bit.ly/project-flamewars',
      repoLink: 'https://github.com/thomasnrggo/flamewars',
      color: 'rgba(247, 99, 12, 0.07)',
      btn: '#F7630C',
    },
    {
      id: 3,
      title: 'Compudram',
      langs: ['CSS', 'Javascript', 'Laravel'],
      desc: 'Sistema para control administrativo',
      image: compudramImg,
      webLink: 'https://bit.ly/project-compudram-system',
      repoLink: 'https://github.com/juandadev/compudram-system',
      color: 'rgba(0, 145, 230, 0.07)',
      btn: '#0091e6',
    },
    {
      id: 4,
      title: 'Cuervo Nutrition',
      langs: ['CSS', 'javascript', 'PHP'],
      desc: 'Asesoramiento nutricional online',
      image: cuervoImg,
      webLink: 'https://bit.ly/project-cuervonut',
      repoLink: 'https://github.com/juandadev/cuervo.mx',
      color: 'rgba(183, 97, 97, 0.07)',
      btn: '#B76161',
    },
    {
      id: 5,
      title: 'Portafolio',
      langs: ['bootstrap', 'react', 'laravel'],
      desc: 'Portafolio y blog personal',
      image: portfolioImg,
      webLink: '',
      repoLink: 'https://github.com/juandadev/portfolio',
      color: 'rgba(0,56,168,0.07)',
      btn: 'rgba(0,56,168,1)',
    },
    {
      id: 6,
      title: 'Epic Style Guide',
      langs: ['Sass', 'javascript'],
      desc: 'Design system para componentes web (Vanilla)',
      image: styleGuideImg,
      webLink: 'http://bit.ly/project-style-guide',
      repoLink: 'https://github.com/juandadev/epic-style-guide',
      color: 'rgba(255, 0, 111, 0.07)',
      btn: '#FF006E',
    },
  ];

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <section id="projects" className="projects">
      <Container>
        <Row className="projects__info">
          <Col>
            <h2 className="projects__info--title h2">Proyectos</h2>

            <p className="projects__info--text text">
              ¡Hecha un vistazo a estos proyectos! es una pequeña selección del trabajo que he
              hecho.
            </p>
          </Col>
        </Row>

        <Row className="projects__container">
          <Col>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {projects.map((item) => (
                <Carousel.Item key={item.id} style={{ background: item.color }}>
                  <img
                    src={item.image}
                    alt="Project mockup"
                    className="projects__container--img d-block w-100"
                  />

                  <Carousel.Caption>
                    <h3 className="projects__container--title h3">{item.title}</h3>

                    <p className="projects__container--text text text-capitalize">
                      {item.langs.map((langs) => `${langs.toString()}, `)}
                    </p>

                    <p className="projects__container--text text">{item.desc}</p>
                  </Carousel.Caption>

                  <Row className="buttons d-flex justify-content-center">
                    {item.webLink ? (
                      <Button
                        variant="projects"
                        href={item.webLink}
                        style={{ backgroundColor: `${item.btn}` }}
                      >
                        Ir al sitio
                      </Button>
                    ) : (
                      ''
                    )}

                    {item.repoLink ? (
                      <Button
                        className="d-flex justify-content-center align-items-center"
                        variant="github"
                        href={item.repoLink}
                        style={{ backgroundColor: `${item.btn}` }}
                      >
                        <img src={githubIcon} alt="GitHub Icon" />
                      </Button>
                    ) : (
                      ''
                    )}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Projects;
