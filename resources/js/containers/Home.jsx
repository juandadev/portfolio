import React from 'react';
import TagManager from 'react-gtm-module';

import Header from '../components/Header';
import Hero from '../components/Hero';

const TagManagerArgs = {
  gtmId: 'GTM-P9B2VRQ',
};

TagManager.initialize(TagManagerArgs);

const Home = () => (
  <>
    <Header />

    <Hero />
  </>
);

export default Home;
