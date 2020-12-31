import React, { Component } from 'react';
import TagManager from 'react-gtm-module';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const TagManagerArgs = {
  gtmId: 'GTM-P9B2VRQ',
};

class Home extends Component {
  componentDidMount() {
    document.title = 'Juan Daniel Martínez, Desarrollador Web';

    TagManager.initialize(TagManagerArgs);
  }

  render() {
    return (
      <>
        <Header />

        <Hero />

        <Skills />

        <Projects />

        <Contact />

        <Footer />
      </>
    );
  }
}

export default Home;
