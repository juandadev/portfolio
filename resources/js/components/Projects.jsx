import React, { useState } from 'react';

import { Container, Row, Col, Carousel } from 'react-bootstrap';

import compudramImg from '../../img/projects/compudram.png';
import cuervoImg from '../../img/projects/cuervonutrition.png';
import inadImg from '../../img/projects/inad.png';
import portfolioImg from '../../img/projects/portfolio.png';
import countriesImg from '../../img/projects/countries.png';
import jobsImg from '../../img/projects/jobs.png';

import '../../sass/Projects.scss';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Compudram',
      langs: ['CSS', 'javascript', 'laravel'],
      desc: '',
      image: compudramImg,
      webLink: 'http://bit.ly/project-compudram',
      repoLink: 'https://github.com/Juandamartn/compudram-system',
      color: 'rgba(0,146,230,0.07)',
    },
    {
      id: 2,
      title: 'Cuervo Nutrition',
      langs: ['CSS', 'javascript', 'PHP'],
      desc: '',
      image: cuervoImg,
      webLink: 'http://bit.ly/project-cuervonut',
      repoLink: 'https://github.com/Juandamartn/cuervo.mx',
      color: 'rgba(166,60,60,0.07)',
    },
    {
      id: 3,
      title: 'INAD',
      langs: ['bootstrap', 'react', 'laravel'],
      desc: '',
      image: inadImg,
      webLink: 'http://bit.ly/project-inad',
      repoLink: '',
      color: 'rgba(64, 61, 207, 0.07)',
    },
    {
      id: 4,
      title: 'Portafolio personal',
      langs: ['bootstrap', 'react', 'laravel'],
      desc: '',
      image: portfolioImg,
      webLink: 'https://juandamartinez.com/',
      repoLink: 'https://github.com/Juandamartn/portfolio',
      color: 'rgba(0,56,168,0.07)',
    },
    {
      id: 5,
      title: 'Where in the world?',
      langs: ['CSS', 'javascript', 'API'],
      desc: '',
      image: countriesImg,
      webLink: 'http://bit.ly/project-countries',
      repoLink: 'https://github.com/Juandamartn/rest-countries-webpage',
      color: '#f2f2f2',
    },
    {
      id: 6,
      title: 'Job listing',
      langs: ['CSS', 'javascript'],
      desc: '',
      image: jobsImg,
      webLink: 'http://bit.ly/project-job-listing',
      repoLink: 'https://github.com/Juandamartn/static-job-listing',
      color: 'rgba(239,250,250,0.7)',
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
            <h2 className="projects__info--title h2">Trabajos</h2>

            <p className="projects__info--text text">
              Esta es una selección de los proyectos más destacados que he creado
            </p>
          </Col>
        </Row>

        <Row className="projects__container">
          <Col>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {projects.map((item) => (
                <Carousel.Item
                  key={item.id}
                  style={{ background: item.color }}
                  onClick={() => (window.location.href = item.webLink)}
                >
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
                  </Carousel.Caption>
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
